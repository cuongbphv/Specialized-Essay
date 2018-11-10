package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Profile;

/**
 * @author Huy Pham
 */


public interface ProfileService {

    Profile saveProfile(Profile profile);

    Profile getProfileByUserId(String userId);

    void deleteProfile(String profileId);
}
