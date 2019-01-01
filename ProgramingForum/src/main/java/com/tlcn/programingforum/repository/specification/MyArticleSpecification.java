package com.tlcn.programingforum.repository.specification;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.util.Constant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * @author buiph on 31/12/2018
 */
public class MyArticleSpecification implements Specification<Article> {

    private final String userId;
    private final int sortCase;
    private final boolean ascSort;
    private int type;

    public MyArticleSpecification(String userId, int sortCase, boolean ascSort, int type) {
        this.userId = userId;
        this.sortCase = sortCase;
        this.ascSort = ascSort;
        this.type = type;
    }

    @Override
    public Predicate toPredicate(Root<Article> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new LinkedList<>();

        Predicate status = cb.notEqual(root.get("status"), Constant.Status.DELETE.getValue());
        predicates.add(status);

        Predicate preUserId = cb.equal(root.get("userId"), userId);
        predicates.add(preUserId);

        if(type != 0) {
            Predicate typeCr = cb.equal(root.get("type"), type);
            predicates.add(typeCr);
        }
        // sort
        Path orderClause;
        switch (sortCase) {
            case Constant.SORT_BY_CREATE_DATE:
                orderClause = root.get("createDate");
                break;
            case Constant.SORT_BY_TYPE:
                orderClause = root.get("type");
                break;
            case Constant.SORT_BY_VIEW:
                orderClause = root.get("viewCount");
                break;
            case Constant.SORT_BY_BOOKMARK:
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
