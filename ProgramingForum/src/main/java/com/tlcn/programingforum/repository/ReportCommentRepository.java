package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.ReportComment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author buiph on 20/12/2018
 */

@Transactional
@Repository
public interface ReportCommentRepository extends CrudRepository<ReportComment, String> {
    ReportComment findByIdCommentIdAndAndIdUserId(String commentId, String userId);
}
