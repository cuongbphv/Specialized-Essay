package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.FollowUser;

import java.util.List;

/**
 * @author Huy Pham
 */


public interface FollowUserService {

    FollowUser getByUserIdAndFollowUserId(String userId, String followUserId);

    List<FollowUser> getAllByUserId(String userId);

    List<FollowUser> getAllByFollowUserId(String followUserId);

    FollowUser save(FollowUser followUser);

    void delete(String followUserId);

}
