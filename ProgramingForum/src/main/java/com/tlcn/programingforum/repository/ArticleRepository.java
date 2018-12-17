package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Article;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author buiph on 16/12/2018
 */

@Transactional
@Repository
public interface ArticleRepository extends CrudRepository<Article, String> {
}
