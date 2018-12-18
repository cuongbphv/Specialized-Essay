package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ArticleInteractRequest;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.ArticleInteract;
import com.tlcn.programingforum.model.entity.key.ArticleUserPK;
import com.tlcn.programingforum.service.ArticleInteractService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author buiph on 18/12/2018
 */

@RestController
@RequestMapping(Constant.ARTICLE_INTERACT_CONTROLLER)
public class ArticleInteractController extends AbstractBasedAPI {

    @Autowired
    ArticleInteractService articleInteractService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> createArticleInteract(
            HttpServletRequest request,
            @RequestBody ArticleInteractRequest articleInteractRequest
            ) {

        if (articleInteractRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        ArticleInteract articleInteract = articleInteractService.findByArticleIdAndUserId(
                articleInteractRequest.getArticleId(), articleInteractRequest.getUserId());

        if(articleInteract == null) {
            ArticleInteract newArticleInteract = new ArticleInteract();
            newArticleInteract.setId(new ArticleUserPK(
                    articleInteractRequest.getArticleId(),articleInteractRequest.getUserId()));
            newArticleInteract.setRating(articleInteractRequest.getRating());
            newArticleInteract.setBookmark(articleInteractRequest.getBookmark());
            newArticleInteract.setShare(articleInteractRequest.getShare());

            return responseUtil.successResponse(
                    articleInteractService.saveArticleInteract(newArticleInteract));
        }

        articleInteract.setRating(articleInteractRequest.getRating());
        articleInteract.setBookmark(articleInteractRequest.getBookmark());
        articleInteract.setShare(articleInteractRequest.getShare());

        return responseUtil.successResponse(
                articleInteractService.saveArticleInteract(articleInteract));
    }


    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getDetailArticle(
            HttpServletRequest request,
            @RequestParam("article_id") String articleId
    ) {

        List<ArticleInteract> articleInteractList = articleInteractService.findByArticleId(articleId);
        return responseUtil.successResponse(articleInteractList);

    }

}
