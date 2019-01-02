package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.Comment;
import com.tlcn.programingforum.repository.CommentRepository;
import com.tlcn.programingforum.repository.specification.CommentSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author buiph on 19/12/2018
 */

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Override
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getListComment(String articleId, int status) {
        return commentRepository.findByArticleIdAndStatus(articleId, status);
    }

    @Override
    public List<Comment> getListCommentByParentId(String parentId, int status) {
        return commentRepository.findByParentIdAndStatus(parentId, status);
    }

    @Override
    public Comment findByCommentIdAndStatus(String commentId, int status) {
        return commentRepository.findByCommentIdAndStatus(commentId, status);
    }

    @Override
    public Page<Comment> getListUserComment(PagingRequestModel pagingRequestModel) {
        CommentSpecification commentSpecification = new CommentSpecification(pagingRequestModel.getUserId(),
                pagingRequestModel.getSortCase(), pagingRequestModel.isAscSort());
        PageRequest pageReq = new PageRequest((pagingRequestModel.getPageNumber() - 1),
                pagingRequestModel.getPageSize());
        return commentRepository.findAll(commentSpecification, pageReq);
    }

    @Override
    public List<String> getUserCommentedByArticleId(String articleId) {
        return commentRepository.findUserIdByArticleId(articleId);
    }
}
