package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Tag;
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
}
