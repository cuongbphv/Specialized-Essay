package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.FollowUser;
import com.tlcn.programingforum.model.entity.key.FollowUserPK;
import com.tlcn.programingforum.repository.FollowUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Huy Pham
 */


@Service
public class FollowUserServiceImpl  implements FollowUserService {

    @Autowired
    FollowUserRepository followUserRepository;


    @Override
    public List<FollowUser> getAllByUserId(String userId) {
        return followUserRepository.findById_UserId(userId);
    }

    @Override
    public FollowUser save(FollowUser followUser) {
        return followUserRepository.save(followUser);
    }

    @Override
    public void delete(String followUseId) {
        followUserRepository.deleteById_FollowUserId(followUseId);
    }
}
