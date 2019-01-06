package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.ReportArticle;

/**
 * @author buiph on 19/12/2018
 */
public interface ReportArticleService {
    ReportArticle createReportArticle(ReportArticle reportArticle);
    ReportArticle findByArticleIdAndUserId(String articleId, String userId);
}
