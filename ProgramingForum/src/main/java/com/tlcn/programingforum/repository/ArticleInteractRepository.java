package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.ArticleInteract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author buiph on 18/12/2018
 */

@Transactional
@Repository
public interface ArticleInteractRepository extends CrudRepository<ArticleInteract, String>,
        JpaSpecificationExecutor<ArticleInteract> {
    List<ArticleInteract> findByIdArticleId(String articleId);

    ArticleInteract findByIdArticleIdAndIdUserId(String articleId, String userId);

    List<ArticleInteract> findByIdUserIdAndAndBookmark(String userID, int bookmark);

    @Query(value = "SELECT art.article_id, art.user_id, art.rating, " +
            "art.bookmark, art.share, art.bookmark_date " +
            "FROM article a, article_interact art " +
            "WHERE a.article_id = art.article_id " +
            "AND art.user_id = ?1 " +
            "AND art.bookmark = 1 " +
            "AND a.type = ?2 " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(*) FROM article a, article_interact art " +
                    "WHERE a.article_id = art.article_id " +
                    "AND art.user_id = ?1 " +
                    "AND art.bookmark = 1 " +
                    "AND a.type = ?2 ",
            nativeQuery = true)
    Page<ArticleInteract> getListBookmarkByArticleType(
            String userId, int type, Pageable pageable);
}
