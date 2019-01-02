package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.FollowUser;

import java.util.List;

/**
 * @author Huy Pham
 */


public interface FollowUserService {

    List<FollowUser> getAllByUserId(String userId);

    FollowUser save(FollowUser followUser);

    void delete(String id);

}
