package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public interface TagRepository extends CrudRepository<Tag, String> {
    Tag findByTagId(String tagId);

    @Query(value = "select t.tagId, t.tagName, t.createDate, t.description, count(t.tagId) as number_of_taged from Tag t, TagArticle ta where t.tagId = ta.id.tagId group by t.tagId order by number_of_taged desc")
    List<Object> findTop5TagMostInForum(Pageable pageable);
}
