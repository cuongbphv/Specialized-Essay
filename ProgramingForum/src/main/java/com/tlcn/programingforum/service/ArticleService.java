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

    Page<Article> getListArticlePaging(PagingRequestModel pagingRequestModel);

    List<Article> findByUserId(String userId);
}
