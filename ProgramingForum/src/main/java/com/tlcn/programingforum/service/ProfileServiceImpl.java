package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Profile;
import com.tlcn.programingforum.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Huy Pham
 */

@Service
public class ProfileServiceImpl extends AbstractBaseService implements ProfileService{

    @Autowired
    ProfileRepository profileRepository;

    @Override
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public Profile getProfileByUserId(String userId) {
        return profileRepository.getProfileByUserId(userId);
    }

    @Override
    public void deleteProfile(String profileId) {
        profileRepository.deleteById(profileId);
    }
}
