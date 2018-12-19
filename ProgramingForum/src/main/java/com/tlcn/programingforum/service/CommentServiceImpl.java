package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Comment;
import com.tlcn.programingforum.repository.CommentRepository;
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
    public List<Comment> getListComment(String articleId) {
        return commentRepository.findByArticleId(articleId);
    }

    @Override
    public List<Comment> getListCommentByParentId(String parentId) {
        return commentRepository.findByParentId(parentId);
    }
}
