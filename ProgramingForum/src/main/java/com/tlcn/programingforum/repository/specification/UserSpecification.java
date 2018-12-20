package com.tlcn.programingforum.repository.specification;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.util.Constant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * @author Huy Pham
 */

public class UserSpecification implements Specification<Article> {

    private final String searchKey;
    private final int sortCase;
    private final boolean ascSort;
    private final String lang;

    public UserSpecification(String searchKey, int sortCase, boolean ascSort, String lang) {
        this.searchKey = searchKey;
        this.sortCase = sortCase;
        this.ascSort = ascSort;
        this.lang = lang;
    }

    @Override
    public Predicate toPredicate(Root<Article> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        List<Predicate> predicates = new LinkedList<>();

        Predicate status = cb.notEqual(root.get("status"), Constant.Status.DELETE.getValue());
        predicates.add(status);

//        if(type != 0) {
//            Predicate typeCr = cb.equal(root.get("type"), type);
//            predicates.add(typeCr);
//        }
        // filter by search key [name]
        if (searchKey != null && !searchKey.trim().isEmpty()) {
            String wrapSearch = "%" + searchKey.trim() + "%";
            Predicate userName = cb.like(root.get("userName"), wrapSearch);
            Predicate email = cb.like(root.get("email"), wrapSearch);
            Predicate fullName = null;
            if (lang.equals("vi")) {
                fullName = cb.like(cb.concat(
                        cb.concat(root.get("lastName"), " "), root.<String>get("firstName")
                ), wrapSearch);
            } else {
                fullName = cb.like(cb.concat(
                        cb.concat(root.get("firstName"), " "), root.<String>get("lastName")
                ), wrapSearch);
            }
            Predicate search = cb.or(userName, email, fullName);
            predicates.add(search);
        }
        // sort
        Path orderClause;
        switch (sortCase) {
            case Constant.SORT_BY_CREATE_DATE:
                orderClause = root.get("createDate");
                break;
            case Constant.SORT_BY_FIRST_NAME:
                orderClause = root.get("firstName");
                break;
            case Constant.SORT_BY_LAST_NAME:
                orderClause = root.get("lastName");
                break;
            case Constant.SORT_BY_USERNAME:
                orderClause = root.get("userName");
                break;
            case Constant.SORT_BY_ROLE:
                orderClause = root.get("role");
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
