package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.CommentInteract;
import com.tlcn.programingforum.repository.CommentInteractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author buiph on 24/12/2018
 */

@Service
public class CommentInteractServiceImpl implements CommentInteractService {

    @Autowired
    CommentInteractRepository commentInteractRepository;

    @Override
    public CommentInteract saveInteract(CommentInteract commentInteract) {
        return commentInteractRepository.save(commentInteract);
    }

    @Override
    public CommentInteract findByCommentIdAndUserId(String commentId, String userId) {
        return commentInteractRepository.findByIdCommentIdAndAndIdUserId(commentId, userId);
    }

    @Override
    public void removeHeartToComment(CommentInteract commentInteract) {
        commentInteractRepository.delete(commentInteract);
    }

    @Override
    public List<CommentInteract> listCommentInteract(String commentId) {
        return commentInteractRepository.findByIdCommentId(commentId);
    }


}
