package com.tlcn.programingforum.repository.specification;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.util.Constant;
import org.springframework.data.jpa.domain.Specification;

/**
 * @author buiph on 18/12/2018
 */

public class ArticleSpecification implements Specification<Article> {

    private final String searchKey;
    private final int sortCase;
    private final boolean ascSort;

    public ArticleSpecification(String searchKey, int sortCase, boolean ascSort) {
        this.searchKey = searchKey;
        this.sortCase = sortCase;
        this.ascSort = ascSort;
    }

    @Override
    public Predicate toPredicate(Root<Article> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new LinkedList<>();

        Predicate status = cb.notEqual(root.get("status"), Constant.Status.DELETE.getValue());
        predicates.add(status);
        // filter by search key [name]
        if (searchKey != null && !searchKey.trim().isEmpty()) {
            String wrapSearch = "%" + searchKey.trim() + "%";
            Predicate title = cb.like(root.get("title"), wrapSearch);
            Predicate content = cb.like(root.get("content"), wrapSearch);
            Predicate search = cb.or(title, content);
            predicates.add(search);
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
