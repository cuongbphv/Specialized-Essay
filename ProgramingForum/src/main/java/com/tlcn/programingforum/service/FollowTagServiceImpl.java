package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.FollowTag;
import com.tlcn.programingforum.repository.FollowTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

/**
 * @author buiph on 21/12/2018
 */

@Service
public class FollowTagServiceImpl implements FollowTagService {

    @Autowired
    FollowTagRepository followTagRepository;

    @Override
    public FollowTag findFollowTag(String tagId, String userId) {
        return followTagRepository.findByIdTagIdAndIdUserId(tagId, userId);
    }

    @Override
    public FollowTag followTag(FollowTag followTag) {
        return followTagRepository.save(followTag);
    }

    @Override
    public void unfollowTag(FollowTag followTag) {
        followTagRepository.delete(followTag);
    }

    @Override
    public Page<FollowTag> getListFollowers(String tagId, PagingRequestModel pageRequest) {
        return followTagRepository.findByIdTagId(tagId,
                new PageRequest(pageRequest.getPageNumber() - 1, pageRequest.getPageSize()));
    }
}
