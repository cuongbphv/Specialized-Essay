package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ReportArticleRequest;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.ReportComment;
import com.tlcn.programingforum.model.entity.key.CommentUserPK;
import com.tlcn.programingforum.service.ReportCommentService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * @author buiph on 20/12/2018
 */

@RestController
@RequestMapping(Constant.REPORT_COMMENT_CONTROLLER)
public class ReportCommentController extends AbstractBasedAPI {

    @Autowired
    ReportCommentService reportCommentService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> createArticleInteract(
            HttpServletRequest request,
            @RequestBody ReportArticleRequest reportArticleRequest
    ) {

        if (reportArticleRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        ReportComment reportComment = reportCommentService.findByCommentIdAndUserId(
                reportArticleRequest.getCommentId(), reportArticleRequest.getUserId());

        if(reportComment != null) {
            throw new ApplicationException(APIStatus.ERR_REPORTED);
        }

        ReportComment newReport = new ReportComment();
        newReport.setId(new CommentUserPK(
                reportArticleRequest.getCommentId(),reportArticleRequest.getUserId()));
        newReport.setReason(reportArticleRequest.getReason());
        newReport.setCreateDate(new Date());

        return responseUtil.successResponse(reportCommentService.createReportComment(newReport));
    }

}
