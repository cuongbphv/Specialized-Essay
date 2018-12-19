package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ArticleRequest;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.ArticleResponse;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Tag;
import com.tlcn.programingforum.model.entity.TagArticle;
import com.tlcn.programingforum.model.entity.key.TagArticlePK;
import com.tlcn.programingforum.service.ArticleService;
import com.tlcn.programingforum.service.TagArticleService;
import com.tlcn.programingforum.service.TagService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author buiph on 15/12/2018
 */
@RestController
@RequestMapping(Constant.ARTICLE_CONTROLLER)
public class ArticleController extends AbstractBasedAPI {

    @Autowired
    ArticleService articleService;

    @Autowired
    TagService tagService;

    @Autowired
    TagArticleService tagArticleService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> createArticle(
            HttpServletRequest request,
            @RequestBody ArticleRequest articleRequest
    ) {
        if (articleRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        // add tag to list tag
        List<Tag> tagList = tagService.findAllTags();
        List<String> tagIds = new ArrayList<>();

        for(String tagOfArticle : articleRequest.getTags()) {
            boolean existed = false;
            for(Tag tag : tagList) {
                if(tag.getTagName().equals(tagOfArticle)) {
                    tagIds.add(tag.getTagId());
                    existed = true;
                }
            }
            if(!existed) {
                Tag newTag = new Tag();
                newTag.setTagName(tagOfArticle);
                newTag.setDescription("");
                newTag.setCreateDate(new Date());
                tagIds.add(tagService.saveTag(newTag).getTagId());
            }
        }

        Article article = new Article();
        article.setTitle(articleRequest.getTitle());
        article.setContent(articleRequest.getContent());
        article.setUserId(articleRequest.getUserId());
        article.setCreateDate(new Date());
        article.setType(Integer.parseInt(articleRequest.getType()));
        article.setStatus(Constant.Status.ACTIVE.getValue());

        Article savedArticle = articleService.saveArticle(article);

        // add to tag_article
        for(String tagId : tagIds) {
            TagArticle tagArticle = new TagArticle();
            TagArticlePK tagArticlePK = new TagArticlePK();
            tagArticlePK.setTagId(tagId);
            tagArticlePK.setArticleId(savedArticle.getArticleId());
            tagArticle.setId(tagArticlePK);
            tagArticleService.saveTagArticle(tagArticle);
        }

        return responseUtil.successResponse(article);
    }

    @RequestMapping(path = Constant.VIEW_COUNT, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> viewCountArticle(
            HttpServletRequest request,
            @RequestParam("article_id") String articleId) {

        Article article = articleService.getDetailArticle(articleId, Constant.Status.ACTIVE.getValue());

        if (article == null) {
            throw new ApplicationException(APIStatus.ERR_ARTICLE_NOT_FOUND);
        }

        article.setViewCount(article.getViewCount() + 1);

        return responseUtil.successResponse(articleService.saveArticle(article));

    }


    @RequestMapping(path = Constant.WITHIN_ID , method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getDetailArticle(
            HttpServletRequest request,
            @PathVariable("id") String articleId) {

        Article article = articleService.getDetailArticle(articleId,
                Constant.Status.ACTIVE.getValue());

        if (article == null) {
            throw new ApplicationException(APIStatus.ERR_ARTICLE_NOT_FOUND);
        }

        List<TagArticle> tagArticleList = tagArticleService.findByArticleId(articleId);
        List<Tag> tagList = new ArrayList<>();
        for(TagArticle tagArticle : tagArticleList) {
            tagList.add(tagService.findTagById(tagArticle.getId().getTagId()));
        }

        ArticleResponse response = new ArticleResponse();
        response.setArticleId(article.getArticleId());
        response.setContent(article.getContent());
        response.setTitle(article.getTitle());
        response.setType(article.getType());
        response.setUserId(article.getUserId());
        response.setTagList(tagList);

        return responseUtil.successResponse(response);

    }

    @RequestMapping(value= Constant.LIST_ARTICLE, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getListArticle(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ) {


        Page<Article> articlePage = articleService.getListArticlePaging(pagingRequestModel);

        return responseUtil.successResponse(articlePage);

    }

}
