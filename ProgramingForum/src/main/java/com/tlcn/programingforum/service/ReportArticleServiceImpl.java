package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.ReportArticle;
import com.tlcn.programingforum.repository.ReportArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author buiph on 19/12/2018
 */

@Service
public class ReportArticleServiceImpl implements ReportArticleService {

    @Autowired
    ReportArticleRepository reportArticleRepository;

    @Override
    public ReportArticle createReportArticle(ReportArticle reportArticle) {
        return reportArticleRepository.save(reportArticle);
    }

    @Override
    public ReportArticle findByArticleIdAndUserId(String articleId, String userId) {
        return reportArticleRepository.findByIdArticleIdAndIdUserId(articleId, userId);
    }
}
