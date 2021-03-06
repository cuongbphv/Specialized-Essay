package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.TagData;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.TagResponse;
import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.entity.Tag;
import com.tlcn.programingforum.repository.TagRepository;
import com.tlcn.programingforum.repository.specification.TagSpecification;
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
    public void deleteTag(Tag tag) {

        tagRepository.delete(tag);
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
        return tagRepository.findAllPaging("%" + pagingRequestModel.getSearchKey().toLowerCase() + "%",
                pagingRequestModel.getSortCase(), pagingRequestModel.getPageSize(),
                (pagingRequestModel.getPageNumber() - 1)*pagingRequestModel.getPageSize());
    }
    @Override
    public Page<Tag> findAllPaging(PagingRequestModel pagingRequestModel, int status) {

        TagSpecification tagSpec = new TagSpecification(pagingRequestModel.getSearchKey(),
                pagingRequestModel.getSortCase(), pagingRequestModel.isAscSort(),
                status, pagingRequestModel.getType());

        PageRequest pageReq = new PageRequest((pagingRequestModel.getPageNumber() - 1),
                pagingRequestModel.getPageSize());

        return tagRepository.findAll(tagSpec, pageReq);

    }


}
