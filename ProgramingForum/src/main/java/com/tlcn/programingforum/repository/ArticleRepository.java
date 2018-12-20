package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
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
}
