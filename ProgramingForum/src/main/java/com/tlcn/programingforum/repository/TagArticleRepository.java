package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.TagArticle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author buiph on 16/12/2018
 */

@Transactional
@Repository
public interface TagArticleRepository extends CrudRepository<TagArticle, String> {
}
