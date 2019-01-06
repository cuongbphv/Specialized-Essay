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

    Article findByArticleIdAndTypeAndStatusAndIsApproved(
            String articleId, int type, int status, int isApproved);

    List<Article> findByUserIdAndTypeAndStatusAndIsApproved(
            String userId, int type, int status, int isApproved);

    List<Article> findByUserIdAndStatusAndIsApproved(
            String userId, int status, int isApproved);

    Article findByRightAnswerId(String rightAnswerId);

    @Query(value = "SELECT * " +
            "FROM article a, article_interact art " +
            "WHERE a.article_id = art.article_id " +
            "AND type = ?1 " +
            "AND is_approved = 1 " +
            "AND a.create_date >= CONCAT(CURDATE(), ' 00:00:00') && a.create_date < CONCAT(CURDATE(), ' 23:59:59') " +
            "GROUP by a.article_id " +
            "HAVING SUM(art.rating) > 1 " +
            "AND a.view_count > 100 " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(*) " +
                    "FROM article a, article_interact art " +
                    "WHERE a.article_id = art.article_id " +
                    "AND type = ?1 " +
                    "AND is_approved = 1 " +
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
            "AND is_approved = 1 " +
            "AND YEARWEEK(a.create_date, 1) = YEARWEEK(CURDATE(), 1) " +
            "GROUP by a.article_id " +
            "HAVING SUM(art.rating) > 1 " +
            "AND a.view_count > 100 " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(*) " +
                    "FROM article a, article_interact art " +
                    "WHERE a.article_id = art.article_id " +
                    "AND type = ?1 " +
                    "AND is_approved = 1 " +
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
            "AND a.is_approved = 1 " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(*) FROM tag_article ta, article a " +
                    "where ta.article_id = a.article_id " +
                    "and ta.tag_id = ?1 " +
                    "and a.type = ?2 " +
                    "AND a.is_approved = 1",
            nativeQuery = true)
    Page<Article> getArticleByTagIdAndType(String tagId, int type, Pageable pageable);

    @Query(value = "SELECT * FROM article " +
            "WHERE type = ?2 AND is_approved = 1 AND MATCH (title,content) AGAINST (?1 IN NATURAL LANGUAGE MODE)",
            countQuery = "SELECT COUNT(*) FROM article " +
                    "WHERE type = ?2 AND is_approved = 1 AND MATCH (title,content) AGAINST (?1 IN NATURAL LANGUAGE MODE)",
            nativeQuery = true)
    Page<Article> searchFullText(String searchKey, int type, Pageable pageable);

    @Query(value = "SELECT a.article_id, a.title, a.content, a.view_count, a.create_date, a.right_answer_id, " +
            "SUM(ai.rating) AS rating, SUM(ai.bookmark) AS bookmark, a.user_id " +
            "FROM article a, article_interact ai " +
            "WHERE " +
            "CASE " +
            "WHEN ?3 = 'title' THEN MATCH (title) AGAINST (?1 IN NATURAL LANGUAGE MODE) " +
            "WHEN ?3 = 'content' THEN MATCH (content) AGAINST (?1 IN NATURAL LANGUAGE MODE) " +
            "WHEN ?3 = 'all' THEN MATCH (title,content) AGAINST (?1 IN NATURAL LANGUAGE MODE) " +
            "END " +
            "AND type = ?2 " +
            "AND is_approved = 1 " +
            "AND a.article_id = ai.article_id " +
            "GROUP BY a.article_id " +
            "ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(*) " +
                    "FROM article a, article_interact ai " +
                    "WHERE " +
                    "CASE " +
                    "WHEN ?3 = 'title' THEN MATCH (title) AGAINST (?1 IN NATURAL LANGUAGE MODE) " +
                    "WHEN ?3 = 'content' THEN MATCH (content) AGAINST (?1 IN NATURAL LANGUAGE MODE) " +
                    "WHEN ?3 = 'all' THEN MATCH (title,content) AGAINST (?1 IN NATURAL LANGUAGE MODE) " +
                    "END " +
                    "AND type = ?2 " +
                    "AND is_approved = 1 " +
                    "AND a.article_id = ai.article_id " +
                    "GROUP BY a.article_id " +
                    "ORDER BY ?#{#pageable}",
            nativeQuery = true)
    Page<Object[]> searchFullTextAndSort(String searchKey, int type, String columnSearch, Pageable pageable);
}
