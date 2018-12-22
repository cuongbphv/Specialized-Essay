package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.TagData;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.entity.Tag;
import com.tlcn.programingforum.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public List<Object> findMostTagInForum() {
        return tagRepository.findTop5TagMostInForum(new PageRequest(0, 5));
    }

    @Override
    public Object getTagInfomation(String tagId) {
        return tagRepository.getTagInfomation(tagId);
    }

    @Override
    public List<Object[]> getAllTags(PagingRequestModel pagingRequestModel) {
        String sortCase = "";
        switch (pagingRequestModel.getSortCase()) {
            case 1: sortCase = "create_date";
            case 2: sortCase = "article_num";
            case 3: sortCase = "question_num";
            case 4: sortCase = "follwer_num";
            default: sortCase = "create_date";
        }
        return tagRepository.findAllPaging("%" + pagingRequestModel.getSearchKey().toLowerCase() + "%",
                sortCase, pagingRequestModel.getPageSize(),
                (pagingRequestModel.getPageNumber() - 1)*pagingRequestModel.getPageSize());
    }


}
