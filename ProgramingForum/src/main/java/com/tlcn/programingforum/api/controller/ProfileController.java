package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ProfileRequest;
import com.tlcn.programingforum.api.model.request.UserRequest;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Profile;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.service.ProfileService;
import com.tlcn.programingforum.service.UserService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;

/**
 * @author Huy Pham
 */

@RestController
@RequestMapping(Constant.PROFILE_API)
public class ProfileController extends AbstractBasedAPI {

    @Autowired
    ProfileService profileService;

    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> createUserProfile(
            HttpServletRequest request,
            @RequestBody ProfileRequest profileRequest
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.USER.getId());

        if (userService.getActiveUserByUserId(profileRequest.getUserId()) != null) {
            throw new ApplicationException(APIStatus.ERR_USER_NOT_FOUND);
        } else {

            Profile profile = new Profile();

            profile.setFirstName(profileRequest.getFirstName());
            profile.setLastName(profileRequest.getLastName());
            profile.setUserId(profileRequest.getUserId());
            profile.setDescription(profileRequest.getDescription());
            profile.setWebsiteLink(profileRequest.getWebsiteLink());
            profile.setGithubLink(profileRequest.getGithubLink());
            profile.setPosition(profileRequest.getPosition());
            profile.setCompany(profileRequest.getCompany());
            profile.setAvatar(profile.getAvatar());

            profileService.saveProfile(profile);

            return responseUtil.successResponse(profile);
        }
    }


    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<RestAPIResponse> updateUserProfile(
            HttpServletRequest request,
            @RequestBody ProfileRequest profileRequest
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.USER.getId());

        Profile profile = profileService.getProfileByUserId(profileRequest.getUserId());

        //check user profile
        if (profile == null) {
            throw new ApplicationException(APIStatus.ERR_USER_PROFILE_NOT_FOUND);
        }
        else {

            profile.setFirstName(profileRequest.getFirstName());
            profile.setLastName(profileRequest.getLastName());
            profile.setDescription(profileRequest.getDescription());
            profile.setWebsiteLink(profileRequest.getWebsiteLink());
            profile.setGithubLink(profileRequest.getGithubLink());
            profile.setPosition(profileRequest.getPosition());
            profile.setCompany(profileRequest.getCompany());
            profile.setAvatar(profile.getAvatar());

            profileService.saveProfile(profile);

            return responseUtil.successResponse(profile);
        }
    }


    @RequestMapping(value = Constant.WITHIN_ID, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getUserProfileByUserId(
            HttpServletRequest request,
            @PathVariable("id") String id
    )  {
        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.USER.getId());

        if (id != null && !id.isEmpty()) {
            Profile profile = profileService.getProfileByUserId(id);
            if (profile == null) {
                throw new ApplicationException(APIStatus.ERR_USER_PROFILE_NOT_FOUND);
            }
            return responseUtil.successResponse(profile);
        } else {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }
    }

}
