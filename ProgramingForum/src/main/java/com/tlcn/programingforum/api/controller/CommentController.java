package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.CommentInteractRequest;
import com.tlcn.programingforum.api.model.request.CommentRequest;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.CommentResponse;
import com.tlcn.programingforum.api.model.response.CommentStat;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Comment;
import com.tlcn.programingforum.model.entity.CommentInteract;
import com.tlcn.programingforum.model.entity.Notification;
import com.tlcn.programingforum.model.entity.key.CommentUserPK;
import com.tlcn.programingforum.model.entity.key.NotificationPK;
import com.tlcn.programingforum.service.ArticleService;
import com.tlcn.programingforum.service.CommentInteractService;
import com.tlcn.programingforum.service.CommentService;
import com.tlcn.programingforum.service.NotificationService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @Autowired
    ArticleService articleService;

    @Autowired
    CommentInteractService commentInteractService;

    @Autowired
    NotificationService notificationService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> addComment(
            HttpServletRequest request,
            @RequestBody CommentRequest commentRequest
            ) {

        AuthUser currentUser = getAuthUserFromSession(request);

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

        Comment savedComment = commentService.saveComment(comment);
        if(savedComment!= null){
            List<Comment> commentList = commentService.getListComment(comment.getArticleId(),
                    Constant.Status.ACTIVE.getValue());

            for(Comment cmt : commentList){
                //Not send notification to current user
                if(!cmt.getUserId().equals(currentUser.getId())){

                    Notification notification = new Notification();
                    NotificationPK id = new NotificationPK();
                    id.setFromUserId(currentUser.getId());
                    id.setToUserId(cmt.getUserId());
                    notification.setNotificationPK(id);
                    notification.setCreateDate(new Date());
                    notification.setStatus(Constant.Status.ACTIVE.getValue());
                    notification.setType(1); // 1 Comment
                    notification.setData(cmt.getArticleId());

                    notificationService.save(notification);
                }
            }
        }

        return responseUtil.successResponse(savedComment);
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

        // delete right answer id
        Article article = articleService.findByRightAnswerId(commentId);
        if(article != null) {
            article.setRightAnswerId(null);
            articleService.saveArticle(article);
        }

        if(comment == null) {
            throw new ApplicationException(APIStatus.ERR_COMMENT_NOT_FOUND);
        }

        comment.setStatus(Constant.Status.DELETE.getValue());
        commentService.saveComment(comment);

        List<Comment> childComments = commentService.getListCommentByParentId(
                comment.getCommentId(), Constant.Status.ACTIVE.getValue());

        for(Comment childComment : childComments) {
            // delete right answer id
            Article articleWithChildComment = articleService.findByRightAnswerId(childComment.getCommentId());
            if(articleWithChildComment != null) {
                articleWithChildComment.setRightAnswerId(null);
                articleService.saveArticle(articleWithChildComment);
            }
            childComment.setStatus(Constant.Status.DELETE.getValue());
            commentService.saveComment(childComment);
        }

        return responseUtil.successResponse("Delete successfully");
    }

    @RequestMapping(path = Constant.COMMENT_INTERACT, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> interactToComment(
            HttpServletRequest request,
            @RequestBody CommentInteractRequest commentRequest
    ) {

        if(commentRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        if(commentRequest.getRating() == Constant.CommentInteractStatus.HEART.getValue()) {
            CommentInteract heart = new CommentInteract();
            heart.setId(new CommentUserPK(commentRequest.getCommentId(), commentRequest.getUserId()));
            heart.setCreateDate(new Date());
            heart.setRating(Constant.CommentInteractStatus.HEART.getValue());
            commentInteractService.saveInteract(heart);
            return responseUtil.successResponse(heart);
        }
        else if (commentRequest.getRating() == Constant.CommentInteractStatus.UNHEART.getValue()) {
            CommentInteract comInteract = commentInteractService.findByCommentIdAndUserId(
                    commentRequest.getCommentId(), commentRequest.getUserId());

            if(comInteract != null) {
                commentInteractService.removeHeartToComment(comInteract);

                return responseUtil.successResponse("Unheart Successfully");
            }

        }

        throw new ApplicationException(APIStatus.ERR_COMMENT_NOT_FOUND);
    }


    @RequestMapping(path = Constant.COMMENT_INTERACT, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getListInteractComment(
            HttpServletRequest request,
            @RequestParam("comment_id") String commentId
    ) {

        List<CommentInteract> listInteract = commentInteractService.listCommentInteract(commentId);

        return responseUtil.successResponse(listInteract);

    }

    @RequestMapping(path = Constant.MY_COMMENT, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getUserComment(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel) {

        if(pagingRequestModel == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        Page<Comment> comments = commentService.getListUserComment(pagingRequestModel);

        return responseUtil.successResponse(comments);
    }

    @RequestMapping(path = Constant.STAT_BY_COMMENT_ID, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> statByCommentId(
            HttpServletRequest request,
            @RequestParam("comment_id") String commentId
    ) {

        CommentStat stat = new CommentStat();

        List<CommentInteract> listInteract = commentInteractService.listCommentInteract(commentId);
        stat.setNumOfHeart(listInteract.size());

        // delete right answer id
        Article article = articleService.findByRightAnswerId(commentId);
        if(article != null) {
            stat.setRightAnswer(true);
        }
        else {
            stat.setRightAnswer(false);
        }

        List<Comment> childComments = commentService.getListCommentByParentId(
                commentId, Constant.Status.ACTIVE.getValue());
        stat.setNumOfReply(childComments.size());

        return responseUtil.successResponse(stat);

    }

}
