package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.ArticleInteract;

import java.util.List;

/**
 * @author buiph on 18/12/2018
 */
public interface ArticleInteractService {
    ArticleInteract saveArticleInteract(ArticleInteract articleInteract);

    ArticleInteract findByArticleIdAndUserId(String articleId, String userId);

    List<ArticleInteract> findByArticleId(String articleId);
}
