package com.tlcn.programingforum.repository.specification;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Comment;
import com.tlcn.programingforum.util.Constant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * @author buiph on 31/12/2018
 */
public class CommentSpecification implements Specification<Comment> {
    private final String userId;
    private final int sortCase;
    private final boolean ascSort;

    public CommentSpecification(String userId, int sortCase, boolean ascSort) {
        this.userId = userId;
        this.sortCase = sortCase;
        this.ascSort = ascSort;
    }

    @Override
    public Predicate toPredicate(Root<Comment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new LinkedList<>();

        Predicate status = cb.notEqual(root.get("status"), Constant.Status.DELETE.getValue());
        predicates.add(status);

        Predicate preUserId = cb.equal(root.get("userId"), userId);
        predicates.add(preUserId);

        // sort
        Path orderClause;
        switch (sortCase) {
            case Constant.SORT_BY_CREATE_DATE:
                orderClause = root.get("createDate");
                break;
            default:
                orderClause = root.get("createDate");
        }

        if (!ascSort) {
            query.orderBy(cb.asc(orderClause));
        } else {
            query.orderBy(cb.desc(orderClause));
        }

        return cb.and(predicates.toArray(new Predicate[]{}));
    }
}
