package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.UserRequest;
import com.tlcn.programingforum.api.model.response.UserDetailResponse;
import com.tlcn.programingforum.api.model.response.UserResponse;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Profile;
import com.tlcn.programingforum.model.entity.Session;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.service.AuthService;
import com.tlcn.programingforum.service.FileUploadService;
import com.tlcn.programingforum.service.ProfileService;
import com.tlcn.programingforum.service.UserService;
import com.tlcn.programingforum.util.CommonUtil;
import com.tlcn.programingforum.util.Constant;
import com.tlcn.programingforum.util.MD5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @author Huy Pham
 */

@RestController
@RequestMapping(Constant.USER_API)
public class UserController extends AbstractBasedAPI {

    @Autowired
    UserService userService;

    @Autowired
    ProfileService profileService;

    @Autowired
    AuthService authService;

    @Autowired
    FileUploadService fileUploadService;

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
        validatePermission(authUser,Constant.SystemRole.USER.getId());

        User user = userService.getActiveUserByUserId(authUser.getId());
        if (user == null) {
            throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
        }

        Profile profile = profileService.getProfileByUserId(user.getUserId());

        if(profile == null){
            throw new ApplicationException(APIStatus.ERR_PROFILE_NOT_FOUND);
        }

        UserResponse response = new UserResponse();

        response.setUserId(user.getUserId());
        response.setUserName(user.getUserName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setCreateDate(user.getCreateDate());
        response.setLastActivity(user.getLastActivity());
        response.setLang(response.getLang());
        response.setSetting(user.getSetting());
        response.setRole(user.getRole());

        response.setFirstName(profile.getFirstName());
        response.setLastName(profile.getLastName());
        response.setAvatar(profile.getAvatar());
        response.setDescription(profile.getDescription());
        response.setWebsiteLink(profile.getWebsiteLink());
        response.setGithubLink(profile.getGithubLink());
        response.setPosition(profile.getPosition());
        response.setCompany(profile.getCompany());

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
        validatePermission(authUser, Constant.SystemRole.SYS_ADMIN.getId());
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
        validatePermission(authUser, Constant.SystemRole.USER.getId());
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
//                previousUpdateUser.setFirstName(userRequest.getFirstName());
//                previousUpdateUser.setLastName(userRequest.getLastName());

                userService.saveUser(previousUpdateUser);

                return responseUtil.successResponse(previousUpdateUser);
            }

        } else {
            throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
        }
    }

    @RequestMapping(path = Constant.USER_REGISTER,
            method = RequestMethod.POST)
//            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<RestAPIResponse> createUser(
//            @RequestPart("avatar") MultipartFile avatar,
//            @RequestPart("userInfo") String userName
            @RequestBody UserRequest userRequest
            ) throws NoSuchAlgorithmException {


        validateParam(userRequest);

        //check exist user
        if (userService.findByEmailAndStatus(userRequest.getEmail(), Constant.Status.ACTIVE.getValue()) != null) {
            throw new ApplicationException(APIStatus.ERR_EMAIL_ALREADY_EXISTS);
        }

        if (userService.findByUserNameAndStatus(userRequest.getUserName(), Constant.Status.ACTIVE.getValue()) != null) {
            throw new ApplicationException(APIStatus.ERR_EXIST_USER_NAME);
        }

        User createdUser = doCreateUser(userRequest);

        if (createdUser != null) {

            Session userSession = authService.createUserToken(createdUser);
            // Create Auth User -> Set to filter config
            // Perform the security
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    createdUser.getUserName(),
                    createdUser.getPasswordHash()
            );
            //final Authentication authentication = authenticationManager.authenticate();
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return responseUtil.successResponse(userSession.getTokenId());

        } else {
            throw new ApplicationException(APIStatus.ERR_CREATE_USER);
        }

    }

    private User doCreateUser(UserRequest userRequest) throws NoSuchAlgorithmException {

        User user = new User();

        if(userRequest.getUserId() != null && !userRequest.getUserId().equals("")){
            user.setUserId(userRequest.getUserId());
        }

        user.setUserName(userRequest.getUserName());
        user.setEmail(userRequest.getEmail().toLowerCase());
        user.setLang(userRequest.getLang());
        user.setCreateDate(new Date());
        user.setStatus(Constant.Status.ACTIVE.getValue());
        String salt = CommonUtil.generateSalt();
        user.setSalt(salt);
        user.setRole(Constant.SystemRole.USER.getId());
        user.setPasswordHash(MD5Hash.MD5Encrypt(userRequest.getPasswordHash() + salt));

        if(userRequest.getPhone() != null) {
            user.setPhone(userRequest.getPhone());
        }

        if(userRequest.getSetting() != null){
            user.setSetting(userRequest.getSetting());
        }

        User createdUser = userService.saveUser(user);

        if (createdUser != null) {

            Profile profile = new Profile();
            profile.setUserId(user.getUserId());
            profile.setFirstName(userRequest.getFirstName());
            profile.setLastName(userRequest.getLastName());

            if(userRequest.getAvatar() != null){
                String url = fileUploadService.uploadFile(userRequest.getAvatar(),
                        "usr_avt_"+user.getUserId());
                profile.setAvatar(url);
            }
//            profile.setAvatar(userRequest.getAvatar());

            if(userRequest.getDescription() != null) {
                profile.setDescription(userRequest.getDescription());
            }

            if(userRequest.getWebsiteLink() != null) {
                profile.setWebsiteLink(userRequest.getWebsiteLink());
            }

            if(userRequest.getGithubLink() != null) {
                profile.setGithubLink(userRequest.getGithubLink());
            }

            if(userRequest.getPosition() != null) {
                profile.setPosition(userRequest.getPosition());
            }

            if(userRequest.getCompany() != null) {
                profile.setCompany(userRequest.getCompany());
            }

            profileService.saveProfile(profile);

            return user;
        }

        return null;
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
