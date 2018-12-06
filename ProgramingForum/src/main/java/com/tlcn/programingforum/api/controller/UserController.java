package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.UserRequest;
import com.tlcn.programingforum.api.model.response.UserDetailResponse;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.service.UserService;
import com.tlcn.programingforum.util.CommonUtil;
import com.tlcn.programingforum.util.Constant;
import com.tlcn.programingforum.util.MD5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

/**
 * @author Huy Pham
 */

@RestController
@RequestMapping(Constant.USER_API)
public class UserController extends AbstractBasedAPI {

    @Autowired
    UserService userService;

    @RequestMapping(value = Constant.WITHIN_ID, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getDetailUserByAdmin(
            HttpServletRequest request,
            @PathVariable("id") String id
    )  {

        if (id != null && !id.isEmpty()) {
            User user = userService.getActiveUserByUserId(id);
            if (user == null) {
                throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
            }
            return responseUtil.successResponse(user);
        } else {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

    }

    @RequestMapping(value = Constant.USER_DETAIL, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getDetailUser(
            HttpServletRequest request
    ) {
        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser,Constant.SystemRole.USER.getName());

        User user = userService.getActiveUserByUserId(authUser.getId());
        if (user == null) {
            throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
        }
        UserDetailResponse response = new UserDetailResponse();

        response.setUserName(user.getUserName());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        if(user.getCreateDate() != null && user.getLastActivity() != null) {
            response.setCreateDate(user.getCreateDate());
            response.setLastActivity(user.getLastActivity());
        }
        response.setSetting(user.getSetting());
        response.setRole(user.getRole());

        return responseUtil.successResponse(response);

    }

//    @RequestMapping(value = Constant.USER_LIST, method = RequestMethod.POST)
//    public ResponseEntity<RestAPIResponse> getUserListByAdmin(
//            HttpServletRequest request,
//            @RequestBody PagingRequestModel pagingRequestModel
//    ) throws NoSuchAlgorithmException {
//        AuthUser authUser = getAuthUserFromSession(request);
//        validatePermission(authUser, Constant.SystemRole.SYS_ADMIN.getName());
//        if (pagingRequestModel == null) {
//            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
//        }
//        return responseUtil.successResponse(userService.getListUserPaging(pagingRequestModel));
//    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<RestAPIResponse> deleteUsersByAdmin(
            HttpServletRequest request,
            @RequestParam(value = "user_ids") String ids
    ) throws NoSuchAlgorithmException {
        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.SYS_ADMIN.getName());
        if (ids.equals("")) {
            throw new ApplicationException(APIStatus.ERR_BAD_PARAMS);
        } else {
            List<String> userIdsList = Arrays.asList(ids.split(","));
            for (String id : userIdsList) {
                User user = userService.getActiveUserByUserId(id);
                if (user != null) {
                    userService.deleteUser(user);
                }
            }
            return responseUtil.successResponse("Delete user(s) successfully!");
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<RestAPIResponse> updateUser(
            HttpServletRequest request,
            @RequestBody UserRequest userRequest
    ) {
        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.USER.getName());
        //validate param
        validateParam(userRequest);

        User previousUpdateUser = userService.getActiveUserByUserId(userRequest.getUserId());

        if (previousUpdateUser != null) {
            // check another user used username or not
            if (isExistUserName(userRequest.getUserName(), userRequest.getUserId())) {
                throw new ApplicationException(APIStatus.ERR_EXIST_USER_NAME);
            } else {

                previousUpdateUser.setUserName(userRequest.getUserName());
                previousUpdateUser.setPhone(userRequest.getPhone());
                previousUpdateUser.setLang(userRequest.getLang());
                previousUpdateUser.setSetting(userRequest.getSetting());
                previousUpdateUser.setFirstName(userRequest.getFirstName());
                previousUpdateUser.setLastName(userRequest.getLastName());

                userService.saveUser(previousUpdateUser);

                return responseUtil.successResponse(previousUpdateUser);
            }

        } else {
            throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
        }
    }

    @RequestMapping(path = Constant.USER_REGISTER, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> createUser(
            HttpServletRequest request,
            @RequestBody UserRequest userRequest
    ) throws NoSuchAlgorithmException {
        //check exist user
        if (userService.findByEmailAndStatus(userRequest.getEmail(), Constant.Status.ACTIVE.getValue()) != null) {
            throw new ApplicationException(APIStatus.ERR_EMAIL_ALREADY_EXISTS);
        } else {
            if (userService.findByUserNameAndStatus(userRequest.getUserName(), Constant.Status.ACTIVE.getValue()) != null) {
                throw new ApplicationException(APIStatus.ERR_EXIST_USER_NAME);
            } else {
                User createdUser = doCreateUser(userRequest);
                if (createdUser != null) {
                    return responseUtil.successResponse(createdUser);
                } else {
                    throw new ApplicationException(APIStatus.ERR_CREATE_USER);
                }
            }
        }
    }

    private User doCreateUser(UserRequest userRequest) throws NoSuchAlgorithmException {

        User user = new User();

        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUserName(userRequest.getUserName());
        user.setEmail(userRequest.getEmail().toLowerCase());
        user.setPhone(userRequest.getPhone());
        user.setLang(userRequest.getLang());
        user.setSetting(userRequest.getSetting());
        user.setStatus(Constant.Status.ACTIVE.getValue());
        String salt = CommonUtil.generateSalt();
        user.setSalt(salt);
        user.setRole(Constant.SystemRole.USER.getName());
        user.setPasswordHash(MD5Hash.MD5Encrypt(userRequest.getPasswordHash() + salt));

        if (userService.saveUser(user) != null) {
            return user;
        } else {
            return null;
        }
    }

    private void validateParam(UserRequest userRequest) {
        try {
            boolean isEmailFormat = CommonUtil.isEmailFormat(userRequest.getEmail());
            if (!isEmailFormat) {
                throw new ApplicationException(APIStatus.ERR_EMAIL_INVALID);
            }
        } catch (Exception e) {
            throw new ApplicationException(APIStatus.ERR_EMAIL_INVALID);
        }

        if (userRequest.getPasswordHash() != null) { // conditional for update user
            if (!userRequest.getPasswordHash().equals(userRequest.getConfirmPassword())) {
                throw new ApplicationException(APIStatus.ERR_PASSWORD_NOT_MATCH);
            }
        }
    }

    //Check if email already exist
    private boolean isExistUserEmail(String email, String userId) {
        User user = userService.findByEmailAndStatus(email, Constant.Status.ACTIVE.getValue());
        if (user != null && !user.getUserId().equals(userId)) {
            return true;
        }
        return false;
    }

    //Check if username already exist
    private boolean isExistUserName(String userName, String userId) {
        User user = userService.findByUserNameAndStatus(userName, Constant.Status.ACTIVE.getValue());
        if (user != null && !user.getUserId().equals(userId)) {
            return true;
        }
        return false;
    }

}
