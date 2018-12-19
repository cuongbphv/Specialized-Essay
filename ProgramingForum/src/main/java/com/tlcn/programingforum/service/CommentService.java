package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

/**
 * @author buiph on 19/12/2018
 */
public interface CommentService {
    Comment saveComment(Comment comment);
    List<Comment> getListComment(String articleId);
    List<Comment> getListCommentByParentId(String parentId);
}
