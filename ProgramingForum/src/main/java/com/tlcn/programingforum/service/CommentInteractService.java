package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.CommentInteract;

import java.util.List;

/**
 * @author buiph on 24/12/2018
 */
public interface CommentInteractService {
    CommentInteract saveInteract(CommentInteract commentInteract);

    CommentInteract findByCommentIdAndUserId(String commentId, String userId);

    void removeHeartToComment(CommentInteract commentInteract);

    List<CommentInteract> listCommentInteract(String commentId);
}
