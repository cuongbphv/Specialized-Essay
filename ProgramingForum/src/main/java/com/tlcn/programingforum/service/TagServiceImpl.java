package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Tag;
import com.tlcn.programingforum.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    TagRepository tagRepository;

    @Override
    public List<Tag> findAllTags() {
        return (List<Tag>)tagRepository.findAll();
    }

    @Override
    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public Tag findTagById(String tagId) {
        return tagRepository.findByTagId(tagId);
    }

    @Override
    public List<Tag> findMostTagInForum() {
        return tagRepository.findTop5TagMostInForum();
    }


}
