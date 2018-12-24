package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.api.model.TagData;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.TagResponse;
import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = "SELECT t.tag_id, t.tag_name, t.description, t.create_date as create_date, " +
            "count(IF(a.type = 1,1,null)) as article_num, " +
            "count(IF(a.type=2,1,null)) as question_num, " +
            "(SELECT count(*) as follower_num from follow_tag ft where ft.tag_id = t.tag_id) as follower_num " +
            "FROM tag t, tag_article ta, article a " +
            "where t.tag_id = ta.tag_id and ta.article_id = a.article_id " +
            "group by t.tag_id " +
            "having t.tag_name like ?1 " +
            "ORDER BY ?2 desc limit ?3 " +
            "offset ?4",
            nativeQuery = true)
    List<Object[]> findAllPaging(String tagName, String sortCase, int limit, int offset);

    @Query("SELECT new com.tlcn.programingforum.api.model.response.TagResponse(t.tagId, t.tagName, t.description, " +
            "t.createDate,3L , 3L) from Tag t " +
            "WHERE t.tagName like :search or t.description like :search")
    Page<TagResponse> findAllPaging(@Param("search") String search, Pageable pageable);

}
