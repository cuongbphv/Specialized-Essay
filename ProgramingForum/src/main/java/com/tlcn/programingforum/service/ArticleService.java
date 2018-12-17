package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Article;

/**
 * @author buiph on 16/12/2018
 */
public interface ArticleService {

    Article saveArticle(Article article);

    Article getDetailArticle(String article, int status);
}
