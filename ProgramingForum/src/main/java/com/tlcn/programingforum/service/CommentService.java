package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

/**
 * @author buiph on 19/12/2018
 */
public interface CommentService {
    Comment saveComment(Comment comment);
    List<Comment> getListComment(String articleId, int status);
    List<Comment> getListCommentByParentId(String parentId, int status);
    Comment findByCommentIdAndStatus(String commentId, int status);
    Page<Comment> getListUserComment(PagingRequestModel pagingRequestModel);
    List<String> getUserCommentedByArticleId(String articleId);
}
