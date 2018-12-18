package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.repository.ArticleRepository;
import com.tlcn.programingforum.repository.specification.ArticleSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    @Override
    public Page<Article> getListArticlePaging(PagingRequestModel pagingRequestModel) {
        ArticleSpecification userSpec = new ArticleSpecification(pagingRequestModel.getSearchKey(),
                pagingRequestModel.getSortCase(), pagingRequestModel.isAscSort());
        PageRequest pageReq = new PageRequest((pagingRequestModel.getPageNumber() - 1), pagingRequestModel.getPageSize());
        return articleRepository.findAll(userSpec, pageReq);
    }
}
