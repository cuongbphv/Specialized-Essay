package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author buiph on 19/12/2018
 */

@Transactional
@Repository
public interface CommentRepository extends CrudRepository<Comment, String> {
    List<Comment> findByArticleIdAndStatus(String articleId, int status);
    List<Comment> findByParentIdAndStatus(String parentId, int status);
    Comment findByCommentIdAndStatus(String commentId, int status);

    @Query("SELECT DISTINCT c.userId from Comment c where c.articleId = :articleId")
    List<String> findUserIdByArticleId(@Param("articleId") String articleId);
}
