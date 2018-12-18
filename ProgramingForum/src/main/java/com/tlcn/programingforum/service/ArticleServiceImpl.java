package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author buiph on 16/12/2018
 */

@Service
public class ArticleServiceImpl extends AbstractBaseService implements ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    @Override
    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public Article getDetailArticle(String articleId, int status) {
        return articleRepository.findByArticleIdAndStatus(articleId, status);
    }
}
