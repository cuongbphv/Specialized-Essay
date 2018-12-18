package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Tag;
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

    @Query(value = "select * from Tag t, Tag_Article ta where t.tagId = ta.id.tagId group by t.tagId order by t.tagName desc limit 5", nativeQuery = true)
    List<Tag> findTop5TagMostInForum();
}
