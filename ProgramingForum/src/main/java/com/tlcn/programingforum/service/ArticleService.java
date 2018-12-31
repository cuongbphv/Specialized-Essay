package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.Article;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */
public interface ArticleService {

    Article saveArticle(Article article);

    Article getDetailArticle(String article, int status);

    Article findByArticleIdAndTypeAndStatus(String articleId, int type, int status);

    Page<Article> getListArticlePaging(PagingRequestModel pagingRequestModel);

    List<Article> findByUserIdAndTypeAndStatus(String userId, int type, int status);

    List<Article> findByUserIdAndStatus(String userId, int status);

    Page<Article> getTrendingArticleToday(PagingRequestModel pagingRequest);

    Page<Article> getTrendingArticleWeek(PagingRequestModel pagingRequest);

    Page<Article> getArticleByTagIdAndType(PagingRequestModel pagingRequest);

    Article findByRightAnswerId(String rightAnswerId);

    Page<Article> getListUserArticle(PagingRequestModel pagingRequestModel);
}
