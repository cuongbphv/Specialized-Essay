package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.ReportArticle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author buiph on 19/12/2018
 */

@Transactional
@Repository
public interface ReportArticleRepository extends CrudRepository<ReportArticle, String> {
    ReportArticle findByIdArticleIdAndIdUserId(String articleId, String userId);
}
