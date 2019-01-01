package com.tlcn.programingforum.repository.specification;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Tag;
import com.tlcn.programingforum.model.entity.TagArticle;
import com.tlcn.programingforum.util.Constant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * @author Huy Pham
 */


public class TagSpecification implements Specification<Tag> {

    private final String searchKey;
    private final int sortCase;
    private final boolean ascSort;
    private int status;

    public TagSpecification(String searchKey, int sortCase, boolean ascSort) {
        this.searchKey = searchKey;
        this.sortCase = sortCase;
        this.ascSort = ascSort;
        this.status = -1;
    }

    public TagSpecification(String searchKey, int sortCase, boolean ascSort, int status) {
        this.searchKey = searchKey;
        this.sortCase = sortCase;
        this.ascSort = ascSort;
        this.status = status;
    }


    @Override
    public Predicate toPredicate(Root<Tag> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        List<Predicate> predicates = new LinkedList<>();

        if(status != -1){
            Predicate statusPre = cb.equal(root.get("status"), status);
            predicates.add(statusPre);
        }

        if (searchKey != null && !searchKey.trim().isEmpty()) {
            String wrapSearch = "%" + searchKey.trim() + "%";
            Predicate tagName = cb.like(root.get("tagName"), wrapSearch);
            Predicate description = cb.like(root.get("description"), wrapSearch);

            Predicate search = cb.or(tagName, description);
            predicates.add(search);
        }

        // sort
        Path orderClause;
        switch (sortCase) {
            case Constant.SORT_BY_CREATE_DATE:
                orderClause = root.get("createDate");
                break;
            case Constant.SORT_BY_TAG_NAME:
                orderClause = root.get("tagName");
                break;
            default:
                orderClause = root.get("createDate");
        }

        if (ascSort) {
            query.orderBy(cb.asc(orderClause));
        } else {
            query.orderBy(cb.desc(orderClause));
        }

        return cb.and(predicates.toArray(new Predicate[]{}));
    }

}
