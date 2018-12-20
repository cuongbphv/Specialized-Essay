package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.ArticleInteract;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author buiph on 18/12/2018
 */

@Transactional
@Repository
public interface ArticleInteractRepository extends CrudRepository<ArticleInteract, String> {
    List<ArticleInteract> findByIdArticleId(String articleId);
    ArticleInteract findByIdArticleIdAndIdUserId(String articleId, String userId);
    List<ArticleInteract> findByIdUserIdAndAndBookmark(String userID, int bookmark);
}
