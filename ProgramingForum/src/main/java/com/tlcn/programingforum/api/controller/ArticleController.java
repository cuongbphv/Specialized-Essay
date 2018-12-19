package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ArticleRequest;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.ArticleResponse;
import com.tlcn.programingforum.api.model.response.StatByArticleResponse;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.*;
import com.tlcn.programingforum.model.entity.key.TagArticlePK;
import com.tlcn.programingforum.service.*;
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

    @Autowired
    CommentService commentService;

    @Autowired
    ArticleInteractService articleInteractService;

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
        List<String> tagIds = addToTagList(articleRequest.getTags(), tagList);

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
        response.setViewCount(article.getViewCount());
        response.setArticleId(article.getArticleId());
        response.setContent(article.getContent());
        if(article.getRightAnswerId() != null){
            response.setRightAnswerId(article.getRightAnswerId());
        }
        response.setTitle(article.getTitle());
        response.setType(article.getType());
        response.setUserId(article.getUserId());
        response.setCreateDate(article.getCreateDate());
//        if(article.getType() == Constant.ArticleType.QUESTION.getValue()) {
//
//        }
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

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<RestAPIResponse> updateArticle(
            HttpServletRequest request,
            @RequestBody ArticleRequest articleRequest
    ) {

        if (articleRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        // add tag to list tag
        List<Tag> tagList = tagService.findAllTags();
        List<String> tagIds = addToTagList(articleRequest.getTags(), tagList);

        Article article = articleService.getDetailArticle(articleRequest.getArticleId(),
                Constant.Status.ACTIVE.getValue());
        article.setTitle(articleRequest.getTitle());
        article.setContent(articleRequest.getContent());

        Article savedArticle = articleService.saveArticle(article);

        // delete all tags
        List<TagArticle> tagArticles = tagArticleService.findByArticleId(articleRequest.getArticleId());
        for(TagArticle oldTag : tagArticles) {
            tagArticleService.deleteTagArticle(oldTag);
        }

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

    @RequestMapping(path = Constant.MARK_AS_RESOLVED, method = RequestMethod.PUT)
    public ResponseEntity<RestAPIResponse> markAsResolvedArticle(
            HttpServletRequest request,
            @RequestBody ArticleRequest articleRequest
    ) {

        if (articleRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        Article article = articleService.getDetailArticle(
                articleRequest.getArticleId(), Constant.Status.ACTIVE.getValue());

        if(article == null) {
            throw new ApplicationException(APIStatus.ERR_ARTICLE_NOT_FOUND);
        }

        article.setRightAnswerId(articleRequest.getRightAnswerId());

        return responseUtil.successResponse(articleService.saveArticle(article));

    }

    @RequestMapping(path = Constant.STATS_BY_ARTICLE, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getStatsByArticle(
            HttpServletRequest request,
            @RequestParam("article_id") String articleId) {

        Article article = articleService.getDetailArticle(articleId,
                Constant.Status.ACTIVE.getValue());

        if (article == null) {
            throw new ApplicationException(APIStatus.ERR_ARTICLE_NOT_FOUND);
        }

        // get number of comment
        int commentNumber = 0;
        List<Comment> comments = commentService.getListComment(articleId);
        for(Comment comment : comments) {
            if(comment.getParentId() != null) {
                List<Comment> childComments = commentService.getListCommentByParentId(
                        comment.getParentId());
                commentNumber += childComments.size();
            }
        }
        commentNumber += comments.size();

        int rating = 0;
        int bookmark = 0;
        int share = 0;
        List<ArticleInteract> articleInteracts = articleInteractService.findByArticleId(articleId);
        for(ArticleInteract articleInteract : articleInteracts) {
            // get number of rating
            rating += articleInteract.getRating();
            // get number of bookmark
            bookmark += articleInteract.getBookmark();
            // get number of share
            share += articleInteract.getShare();
        }

        List<TagArticle> tags = tagArticleService.findByArticleId(articleId);
        List<Tag> tagList = new ArrayList<>();
        for(TagArticle tagArticle : tags) {
            Tag tag = tagService.findTagById(tagArticle.getId().getTagId());
            tagList.add(tag);
        }

        // map data
        StatByArticleResponse response = new StatByArticleResponse();
        response.setRating(rating);
        response.setBookmark(bookmark);
        response.setShare(share);
        response.setCommentNum(commentNumber);
        response.setTags(tagList);

        return responseUtil.successResponse(response);

    }


    private List<String> addToTagList(List<String> tagNames, List<Tag> tagList) {
        List<String> tagIds = new ArrayList<>();

        for(String tagOfArticle : tagNames) {
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

        return tagIds;
    }

}
