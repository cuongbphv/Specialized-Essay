package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.service.AuthService;
import com.tlcn.programingforum.service.UserService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;

/**
 * @author Huy Pham
 */
@RestController
@RequestMapping(Constant.ADMIN_API)
public class AdminController extends AbstractBasedAPI {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    /**
     * Get Administrator profile
     *
     * @param request
     * @return
     */
    @RequestMapping(path = Constant.ADMIN_SETTING, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getAdminProfile(
            HttpServletRequest request
    ) {
        AuthUser authUser = getAuthUserFromSession(request);
        if (authUser != null) {
            User admin = authService.getUserByIdAndStatus(authUser.getId(), Constant.Status.ACTIVE.getValue());
            if (admin != null) {
                return responseUtil.successResponse(admin);
            } else {
                throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
            }
        } else {
            throw new ApplicationException(APIStatus.ERR_BAD_PARAMS);
        }
    }

    @RequestMapping(path = "/test", method = RequestMethod.POST)
    public ResponseEntity<ResponseEntity> test(
            @RequestPart("avatar") MultipartFile avatar,
            @RequestPart("content") String content
            ){


        System.out.printf("Hihi");

        return null;
    }
}
