package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.TagData;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.TagResponse;
import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.entity.Tag;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

public interface TagService {
    List<Tag> findAllTags();
    Tag saveTag(Tag tag);
    void deleteTag(Tag tag);
    Tag findTagById(String tagId);
    List<Object> findMostTagInForum();
    Object getTagInfomation(String tagId);
    List<Object[]> getAllTags(PagingRequestModel pagingRequestModel);
    Page<Tag> findAllPaging(PagingRequestModel pagingRequestModel, int status);
}
