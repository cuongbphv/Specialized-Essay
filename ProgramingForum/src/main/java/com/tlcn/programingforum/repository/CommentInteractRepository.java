package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.CommentInteract;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author buiph on 24/12/2018
 */

@Repository
@Transactional
public interface CommentInteractRepository extends CrudRepository<CommentInteract,String> {
    List<CommentInteract> findByIdCommentId(String commentId);
    CommentInteract findByIdCommentIdAndAndIdUserId(String commnetId, String userId);
}
