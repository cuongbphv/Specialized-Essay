package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ArticleRequest;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Tag;
import com.tlcn.programingforum.model.entity.TagArticle;
import com.tlcn.programingforum.service.ArticleService;
import com.tlcn.programingforum.service.TagArticleService;
import com.tlcn.programingforum.service.TagService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
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

        for(String tag : articleRequest.getTags()) {
            for(Tag thisTag : tagList) {
                if (!thisTag.getTagName().equals(tag)) {
                    Tag newTag = new Tag();
                    newTag.setTagName(tag);
                    newTag.setDescription("");
                    tagIds.add(tagService.saveTag(newTag).getTagId());
                }
                else {
                    tagIds.add(thisTag.getTagId());
                }
            }
        }

        Article article = new Article();
        article.setTitle(articleRequest.getTitle());
        article.setContent(articleRequest.getContent());
        article.setUserId(articleRequest.getUserId());
        article.setType(articleRequest.getType());

        Article savedArticle = articleService.saveArticle(article);

        // add to tag_article
        for(String tagId : tagIds) {
            TagArticle tagArticle = new TagArticle();
            tagArticle.setTagId(tagId);
            tagArticle.setArticleId(savedArticle.getArticleId());
            tagArticleService.saveTagArticle(tagArticle);
        }

        return responseUtil.successResponse(article);
    }

}
