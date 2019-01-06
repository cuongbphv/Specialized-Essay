package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.repository.ArticleRepository;
import com.tlcn.programingforum.repository.specification.ArticleSpecification;
import com.tlcn.programingforum.repository.specification.MyArticleSpecification;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Article findByArticleIdAndTypeAndStatus(String articleId, int type, int status) {
        return articleRepository.findByArticleIdAndTypeAndStatusAndIsApproved(
                articleId, type, status, Constant.ApproveStatus.APPROVED_STATUS.getValue());
    }

    @Override
    public Page<Article> getListArticlePaging(PagingRequestModel pagingRequestModel) {
        ArticleSpecification userSpec = new ArticleSpecification(pagingRequestModel.getSearchKey(),
                pagingRequestModel.getSortCase(), pagingRequestModel.isAscSort(),
                pagingRequestModel.getType(), Constant.ApproveStatus.APPROVED_STATUS.getValue());
        PageRequest pageReq = new PageRequest((pagingRequestModel.getPageNumber() - 1), pagingRequestModel.getPageSize());
        return articleRepository.findAll(userSpec, pageReq);
    }

    @Override
    public Page<Article> getListArticlePagingByApproveStatus(PagingRequestModel pagingRequestModel, int status) {

        ArticleSpecification userSpec = new ArticleSpecification(pagingRequestModel.getSearchKey(),
                pagingRequestModel.getSortCase(), pagingRequestModel.isAscSort(),
                pagingRequestModel.getType(), status);
        PageRequest pageReq = new PageRequest((pagingRequestModel.getPageNumber() - 1), pagingRequestModel.getPageSize());
        return articleRepository.findAll(userSpec, pageReq);

    }

    @Override
    public List<Article> findByUserIdAndTypeAndStatus(String userId, int type, int status) {
        return articleRepository.findByUserIdAndTypeAndStatusAndIsApproved(
                userId, type, status, Constant.ApproveStatus.APPROVED_STATUS.getValue());
    }

    @Override
    public List<Article> findByUserIdAndStatus(String userId, int status) {
        return articleRepository.findByUserIdAndStatusAndIsApproved(
                userId, status, Constant.ApproveStatus.APPROVED_STATUS.getValue());
    }

    @Override
    public Page<Article> getTrendingArticleToday(PagingRequestModel pagingRequest) {
        return articleRepository.getArticleTrendingToday(pagingRequest.getType(),
                new PageRequest(pagingRequest.getPageNumber() - 1, pagingRequest.getPageSize()));
    }

    @Override
    public Page<Article> getTrendingArticleWeek(PagingRequestModel pagingRequest) {
        return articleRepository.getArticleTrendingWeek(pagingRequest.getType(),
                new PageRequest(pagingRequest.getPageNumber() - 1, pagingRequest.getPageSize()));
    }

    @Override
    public Page<Article> getArticleByTagIdAndType(PagingRequestModel pagingRequest) {
        return articleRepository.getArticleByTagIdAndType(
                pagingRequest.getSearchKey(), pagingRequest.getType(),
                new PageRequest(pagingRequest.getPageNumber() -1, pagingRequest.getPageSize()));
    }

    @Override
    public Article findByRightAnswerId(String rightAnswerId) {
        return articleRepository.findByRightAnswerId(rightAnswerId);
    }

    @Override
    public Page<Article> getListUserArticle(PagingRequestModel pagingRequestModel) {
        MyArticleSpecification articleSpecification = new MyArticleSpecification(pagingRequestModel.getUserId(),
                pagingRequestModel.getSortCase(), pagingRequestModel.isAscSort(),
                pagingRequestModel.getType());
        PageRequest pageReq = new PageRequest((pagingRequestModel.getPageNumber() - 1),
                pagingRequestModel.getPageSize());
        return articleRepository.findAll(articleSpecification, pageReq);
    }

    @Override
    public Page<Article> searchArticleByType(int type, PagingRequestModel pagingRequestModel) {
        return articleRepository.searchFullText(pagingRequestModel.getSearchKey(), type,
        new PageRequest(pagingRequestModel.getPageNumber() - 1, pagingRequestModel.getPageSize()));
    }

    @Override
    public Page<Object[]> searchArticleByTypeAndSort(String searchColumn, PagingRequestModel pagingRequest) {

        String properties = "";

        switch (pagingRequest.getSortCase()){
            case 1: properties = "create_date";
            case 2: properties = "view_count";
            case 3: properties = "bookmark";
            case 4: properties = "rating";
            default: properties = "view_count";
        }

        Sort sort = new Sort(pagingRequest.isAscSort()?Sort.Direction.ASC: Sort.Direction.DESC,
                properties);

        return articleRepository.searchFullTextAndSort(pagingRequest.getSearchKey(), pagingRequest.getType(),
                searchColumn, // fake for column search (sorry because i'm lazy :)) )
                new PageRequest(pagingRequest.getPageNumber() - 1, pagingRequest.getPageSize(),sort));
    }
}
