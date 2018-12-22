package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

@Transactional
@Repository
public interface ArticleRepository extends CrudRepository<Article, String>, JpaSpecificationExecutor<Article> {

    Article findByArticleIdAndStatus(String articleId, int status);

    Article findByArticleIdAndTypeAndStatus(String articleId, int type, int status);

    List<Article> findByUserIdAndTypeAndStatus(String userId, int type, int status);

    List<Article> findByUserIdAndStatus(String userId, int status);

    @Query(value = "SELECT * " +
            "FROM article a, article_interact art " +
            "WHERE a.article_id = art.article_id " +
            "AND type = ?1 " +
            "AND a.create_date >= CONCAT(CURDATE(), ' 00:00:00') && a.create_date < CONCAT(CURDATE(), ' 23:59:59') " +
            "GROUP by a.article_id " +
            "HAVING SUM(art.rating) > 1 " +
            "AND a.view_count > 100 " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT * " +
                    "FROM article a, article_interact art " +
                    "WHERE a.article_id = art.article_id " +
                    "AND type = ?1 " +
                    "AND a.create_date >= CONCAT(CURDATE(), ' 00:00:00') && a.create_date < CONCAT(CURDATE(), ' 23:59:59') " +
                    "GROUP by a.article_id " +
                    "HAVING SUM(art.rating) > 1 " +
                    "AND a.view_count > 100 ",
            nativeQuery = true)
    Page<Article> getArticleTrendingToday(int type, Pageable pageable);

    @Query(value = "SELECT * " +
            "FROM article a, article_interact art " +
            "WHERE a.article_id = art.article_id " +
            "AND type = ?1 " +
            "AND YEARWEEK(a.create_date, 1) = YEARWEEK(CURDATE(), 1) " +
            "GROUP by a.article_id " +
            "HAVING SUM(art.rating) > 1 " +
            "AND a.view_count > 100 " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT * " +
                    "FROM article a, article_interact art " +
                    "WHERE a.article_id = art.article_id " +
                    "AND type = ?1 " +
                    "AND YEARWEEK(a.create_date, 1) = YEARWEEK(CURDATE(), 1) " +
                    "GROUP by a.article_id " +
                    "HAVING SUM(art.rating) > 1 " +
                    "AND a.view_count > 100 ",
            nativeQuery = true)
    Page<Article> getArticleTrendingWeek(int type, Pageable pageable);

    @Query(value = "SELECT * FROM tag_article ta, article a " +
            "where ta.article_id = a.article_id " +
            "and ta.tag_id = ?1 " +
            "and a.type = ?2 " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(*) FROM tag_article ta, article a " +
                    "where ta.article_id = a.article_id " +
                    "and ta.tag_id = ?1 " +
                    "and a.type = ?2",
            nativeQuery = true)
    Page<Article> getArticleByTagIdAndType(String tagId, int type, Pageable pageable);
}
