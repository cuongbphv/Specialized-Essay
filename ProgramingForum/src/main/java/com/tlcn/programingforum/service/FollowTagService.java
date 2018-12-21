package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.FollowTag;
import org.springframework.data.domain.Page;

/**
 * @author buiph on 21/12/2018
 */
public interface FollowTagService {
    FollowTag findFollowTag(String tagId, String userId);
    FollowTag followTag(FollowTag followTag);
    void unfollowTag(FollowTag followTag);
    Page<FollowTag> getListFollowers(String tagId, PagingRequestModel pageRequest);
}
