package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.CommentRequest;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.CommentResponse;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Comment;
import com.tlcn.programingforum.service.CommentService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author buiph on 19/12/2018
 */

@RestController
@RequestMapping(Constant.COMMENT_CONTROLLER)
public class CommentController extends AbstractBasedAPI {

    @Autowired
    CommentService commentService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> addComment(
            HttpServletRequest request,
            @RequestBody CommentRequest commentRequest
            ) {

        if (commentRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        Comment comment = new Comment();
        if(commentRequest.getParentId() != null) {
            comment.setParentId(commentRequest.getParentId());
        }
        comment.setArticleId(commentRequest.getArticleId());
        comment.setUserId(commentRequest.getUserId());
        comment.setContent(commentRequest.getContent());
        comment.setCreateDate(new Date());
        comment.setStatus(Constant.Status.ACTIVE.getValue());

        return responseUtil.successResponse(commentService.saveComment(comment));
    }

    @RequestMapping(path = Constant.LIST_COMMENT_IN_ARTICLE, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> viewCountArticle(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel) {

        List<Comment> comments = commentService.getListComment(
                pagingRequestModel.getSearchKey(), Constant.Status.ACTIVE.getValue());

        List<CommentResponse> responses = new ArrayList<>();

        for(Comment parentComment: comments) {
            if(parentComment.getParentId() == null) {
                CommentResponse response = new CommentResponse();
                response.setCommentId(parentComment.getCommentId());
                response.setArticleId(parentComment.getArticleId());
                response.setUserId(parentComment.getUserId());
                response.setCreateDate(parentComment.getCreateDate());
                response.setContent(parentComment.getContent());
                List<Comment> childComments = commentService.getListCommentByParentId(
                        parentComment.getCommentId(), Constant.Status.ACTIVE.getValue());
                response.setChildComments(childComments);
                responses.add(response);
            }
        }

        return responseUtil.successResponse(responses);

    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<RestAPIResponse> updateComment(
            HttpServletRequest request,
            @RequestBody CommentRequest commentRequest
    ) {

        if (commentRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        Comment comment = commentService.findByCommentIdAndStatus(
                commentRequest.getCommentId(), Constant.Status.ACTIVE.getValue());

        if(comment == null) {
            throw new ApplicationException(APIStatus.ERR_COMMENT_NOT_FOUND);
        }

        comment.setContent(commentRequest.getContent());

        return responseUtil.successResponse(commentService.saveComment(comment));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<RestAPIResponse> deleteComment(
            HttpServletRequest request,
            @RequestParam("comment_id") String commentId
            ) {

        if (commentId.equals("")) {
            throw new ApplicationException(APIStatus.ERR_BAD_PARAMS);
        }

        Comment comment = commentService.findByCommentIdAndStatus(
                commentId, Constant.Status.ACTIVE.getValue());

        if(comment == null) {
            throw new ApplicationException(APIStatus.ERR_COMMENT_NOT_FOUND);
        }

        comment.setStatus(Constant.Status.DELETE.getValue());
        commentService.saveComment(comment);

        List<Comment> childComments = commentService.getListCommentByParentId(
                comment.getCommentId(), Constant.Status.ACTIVE.getValue());

        for(Comment childComment : childComments) {
            childComment.setStatus(Constant.Status.DELETE.getValue());
            commentService.saveComment(childComment);
        }

        return responseUtil.successResponse("Delete successfully");
    }

}