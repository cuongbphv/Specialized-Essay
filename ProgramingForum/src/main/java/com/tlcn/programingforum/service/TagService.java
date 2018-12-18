package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.entity.Tag;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

public interface TagService {
    List<Tag> findAllTags();
    Tag saveTag(Tag tag);
    Tag findTagById(String tagId);
    List<Object> findMostTagInForum();
}
