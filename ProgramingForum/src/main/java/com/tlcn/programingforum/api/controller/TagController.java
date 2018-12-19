package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ArticleRequest;
import com.tlcn.programingforum.api.model.response.TopTagResponse;
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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @author buiph on 18/12/2018
 */

@RestController
@RequestMapping(Constant.TAG_CONTROLLER)
public class TagController extends AbstractBasedAPI {

    @Autowired
    TagService tagService;

    @Autowired
    TagArticleService tagArticleService;

    @Autowired
    ArticleService articleService;


    @RequestMapping(path = Constant.MOST_TAG_IN_FORUM, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getMostTagUsedInForum(
            HttpServletRequest request
    ) {
        List<Object> tagList = tagService.findMostTagInForum();

        return responseUtil.successResponse(tagList);
    }

    @RequestMapping(path = Constant.MY_TAGS, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getMyTags(
            HttpServletRequest request,
            @RequestParam("user_id") String userId
    ) {

        if(userId.equals("")) {
            throw new ApplicationException(APIStatus.ERR_BAD_PARAMS);
        }

        List<Tag> myTags = new ArrayList<>();
        List<Article> articles = articleService.findByUserId(userId);

        for(Article article : articles) {
            List<TagArticle> tagArticles = tagArticleService.findByArticleId(article.getArticleId());
            for(TagArticle tagArticle : tagArticles) {
                Tag tag = tagService.findTagById(tagArticle.getId().getTagId());
                if(!myTags.contains(tag)) {
                    myTags.add(tag);
                }
            }
        }

        return responseUtil.successResponse(myTags);
    }
}
