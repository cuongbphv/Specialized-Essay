package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ArticleInteractRequest;
import com.tlcn.programingforum.api.model.request.ReportArticleRequest;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.ArticleInteract;
import com.tlcn.programingforum.model.entity.ReportArticle;
import com.tlcn.programingforum.model.entity.key.ArticleUserPK;
import com.tlcn.programingforum.service.ReportArticleService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author buiph on 18/12/2018
 */

@RestController
@RequestMapping(Constant.REPORT_ARTICLE_CONTROLLER)
public class ReportArticleController extends AbstractBasedAPI {

    @Autowired
    ReportArticleService reportArticleService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> createArticleInteract(
            HttpServletRequest request,
            @RequestBody ReportArticleRequest reportArticleRequest
    ) {

        if (reportArticleRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        ReportArticle reportArticle = reportArticleService.findByArticleIdAndUserId(
                reportArticleRequest.getArticleId(), reportArticleRequest.getUserId());

        if(reportArticle != null) {
            throw new ApplicationException(APIStatus.ERR_REPORTED);
        }

        ReportArticle newReport = new ReportArticle();
        newReport.setId(new ArticleUserPK(
                reportArticleRequest.getArticleId(),reportArticleRequest.getUserId()));
        newReport.setReason(reportArticleRequest.getReason());

        return responseUtil.successResponse(reportArticleService.createReportArticle(newReport));
    }

}
