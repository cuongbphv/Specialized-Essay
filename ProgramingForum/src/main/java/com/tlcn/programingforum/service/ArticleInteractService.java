package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.ArticleInteract;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author buiph on 18/12/2018
 */
public interface ArticleInteractService {
    ArticleInteract saveArticleInteract(ArticleInteract articleInteract);

    ArticleInteract findByArticleIdAndUserId(String articleId, String userId);

    List<ArticleInteract> findByArticleId(String articleId);

    Page<ArticleInteract> getListBookmarkByArticleType(PagingRequestModel pageRequest);
}
