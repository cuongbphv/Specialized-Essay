package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.ReportComment;

/**
 * @author buiph on 20/12/2018
 */

public interface ReportCommentService {
    ReportComment createReportComment(ReportComment reportComment);
    ReportComment findByCommentIdAndUserId(String commentId, String userId);
}
