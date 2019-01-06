package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.TagArticle;
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
public interface TagArticleRepository extends CrudRepository<TagArticle, String> {
    List<TagArticle> findByIdArticleId(String articleId);
    List<TagArticle> findByIdTagId(String tagId);

    void deleteById_TagId(String tagId);
}
