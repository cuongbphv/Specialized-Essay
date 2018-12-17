package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Tag;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

public interface TagService {
    List<Tag> findAllTags();
    Tag saveTag(Tag tag);
}
