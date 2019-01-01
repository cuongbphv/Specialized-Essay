package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.api.model.TagData;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.TagResponse;
import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

@Transactional
@Repository
public interface TagRepository extends CrudRepository<Tag, String>, JpaSpecificationExecutor<Tag> {
    Tag findByTagId(String tagId);

    @Query(value = "select t.tagId, t.tagName, t.createDate, t.description, count(t.tagId) as number_of_taged from Tag t, TagArticle ta where t.tagId = ta.id.tagId group by t.tagId order by number_of_taged desc")
    List<Object> findTop5TagMostInForum(Pageable pageable);

    @Query(value = "SELECT t.tag_id, t.tag_name, t.description, t.create_date, " +
            "count(if(a.type = 1, 1, null)) as number_article, " +
            "COUNT(IF(a.type = 2, 1, null)) as number_question " +
            "FROM tag t, tag_article ta, article a " +
            "WHERE t.tag_id = ta.tag_id " +
            "and ta.article_id = a.article_id " +
            "and t.tag_id = ?1 " +
            "group by t.tag_id",
            nativeQuery = true)
    Object getTagInfomation(String tagId);

    @Query(value = "SELECT t.tag_id, t.tag_name, t.description, t.create_date, " +
            "(COUNT(IF(a.type = 1,1,NULL))) AS article_num, " +
            "(COUNT(IF(a.type=2,1,NULL))) AS question_num, " +
            "(SELECT COUNT(*) AS follower_num FROM follow_tag ft WHERE ft.tag_id = t.tag_id) AS follower_num " +
            "FROM tag t, tag_article ta, article a " +
            "WHERE t.tag_id = ta.tag_id AND ta.article_id = a.article_id " +
            "GROUP BY t.tag_id " +
            "HAVING t.tag_name LIKE ?1 " +
            "ORDER BY " +
            "(CASE WHEN ?2 = 5 THEN tag_name END) ASC," +
            "(CASE WHEN ?2 = 2 THEN article_num END) DESC," +
            "(CASE WHEN ?2 = 3 THEN question_num END) DESC," +
            "(CASE WHEN ?2 = 4 THEN follower_num END) DESC," +
            "(CASE WHEN ?2 = 1 THEN t.create_date END) ASC " +
            "limit ?3 " +
            "offset ?4",
            nativeQuery = true)
    List<Object[]> findAllPaging(String tagName, int sortCase, int limit, int offset);

    @Query("SELECT new com.tlcn.programingforum.api.model.response.TagResponse(t.tagId, t.tagName, t.description, " +
            "t.createDate,3L , 3L) from Tag t " +
            "WHERE t.tagName like :search or t.description like :search")
    Page<TagResponse> findAllPaging(@Param("search") String search, Pageable pageable);

}
