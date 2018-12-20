package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.ReportComment;
import com.tlcn.programingforum.repository.ReportCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author buiph on 20/12/2018
 */

@Service
public class ReportCommentServiceImpl implements ReportCommentService {

    @Autowired
    ReportCommentRepository reportCommentRepository;

    @Override
    public ReportComment createReportComment(ReportComment reportComment) {
        return reportCommentRepository.save(reportComment);
    }

    @Override
    public ReportComment findByCommentIdAndUserId(String commentId, String userId) {
        return reportCommentRepository.findByIdCommentIdAndAndIdUserId(
                commentId, userId);
    }
}
