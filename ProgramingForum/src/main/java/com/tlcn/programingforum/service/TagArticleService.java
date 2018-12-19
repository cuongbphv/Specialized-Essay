package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.TagArticle;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

public interface TagArticleService {
    TagArticle saveTagArticle(TagArticle tagArticle);
    List<TagArticle> findByArticleId(String articleId);
    void deleteTagArticle(TagArticle tagArticle);
}
