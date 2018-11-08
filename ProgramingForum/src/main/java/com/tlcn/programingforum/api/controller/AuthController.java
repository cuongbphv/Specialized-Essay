package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.AuthRequestModel;
import com.tlcn.programingforum.api.model.request.UserRequest;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Session;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.service.AuthService;
import com.tlcn.programingforum.service.UserService;
import com.tlcn.programingforum.util.CommonUtil;
import com.tlcn.programingforum.util.Constant;
import com.tlcn.programingforum.util.MD5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;

/**
 * @author Huy Pham
 */

@RestController
@RequestMapping(Constant.AUTH_API)
public class AuthController extends AbstractBasedAPI {


    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;


    /**
     * API user login
     *
     * @param requestModel
     * @return
     */
    @RequestMapping(path = Constant.USER_LOGIN_API, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> login(
            @RequestBody AuthRequestModel requestModel
    ) {

        // Get Active User
        User user = authService.getUserByUserNameAndStatus(requestModel.getAccount(), Constant.Status.ACTIVE.getValue());
        if (user == null) {
            throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
        }

        // check password
        String passwordHash = null;
        try {
            passwordHash = MD5Hash.MD5Encrypt(requestModel.passwordHash + user.getSalt());
        } catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException("User login encrypt password error", ex);
        }

        if (!passwordHash.equals(user.getPasswordHash())) {
            throw new ApplicationException(APIStatus.ERR_PASSWORD_NOT_MATCH);
        }

        // Everything ok. Create session
        // TODO login
        Session userSession = authService.createUserToken(user, requestModel.keepLogin);
        // Create Auth User -> Set to filter config
        // Perform the security
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getUserName(),
                user.getPasswordHash()
        );
        //final Authentication authentication = authenticationManager.authenticate();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return responseUtil.successResponse(userSession.getTokenId());
    }

    @RequestMapping(path = Constant.LOGOUT_API, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> logout(
            HttpServletRequest request,
            @RequestHeader(value = Constant.HEADER_TOKEN) String tokenId
    ) {
        AuthUser authUser = getAuthUserFromSession(request);
        if (tokenId != null && !"".equals(tokenId)) {
            Session userToken = authService.getUserByTokenId(tokenId);
            if (userToken != null) {
                authService.deleteUserToken(userToken);
                return responseUtil.successResponse("OK");
            } else {
                throw new ApplicationException(APIStatus.ERR_SESSION_NOT_FOUND);
            }
        } else {
            throw new ApplicationException(APIStatus.ERR_BAD_PARAMS);
        }
    }

    @RequestMapping(path = Constant.AUTH_USER_INFO, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getSessionData(
            HttpServletRequest request
    ) {
        AuthUser authUser = getAuthUserFromSession(request);
        if (authUser != null) {
            User user = authService.getUserByIdAndStatus(authUser.getId(), Constant.Status.ACTIVE.getValue());
            if (user != null) {
                authUser.setLang(user.getLang());
                return responseUtil.successResponse(authUser);
            } else {
                throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
            }
        } else {
            throw new ApplicationException(APIStatus.ERR_BAD_PARAMS);
        }
    }

    @RequestMapping(path = Constant.AUTH_USER_REGISTER, method = RequestMethod.POST)
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
        // process with password
        String salt = CommonUtil.generateSalt();
        user.setSalt(salt);
        user.setRole(Constant.SystemRole.USER.getName());
        //String passHash = MD5Hash.MD5Encrypt(userRequest.getPassword());
        user.setPasswordHash(MD5Hash.MD5Encrypt(userRequest.getPasswordHash() + salt));

        if (userService.saveUser(user) != null) {
            return user;
        } else {
            return null;
        }
    }


}
