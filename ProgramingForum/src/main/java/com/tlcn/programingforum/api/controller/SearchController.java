package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.PagingResponseModel;
import com.tlcn.programingforum.api.model.response.SearchResponse;
import com.tlcn.programingforum.api.model.response.TopSearchResult;
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
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.directory.SearchResult;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author buiph on 02/01/2019
 */

@RestController
@RequestMapping(Constant.SEARCH_CONTROLLER)
public class SearchController extends AbstractBasedAPI {

    @Autowired
    ArticleService articleService;

    @Autowired
    TagService tagService;

    @Autowired
    TagArticleService tagArticleService;

    @RequestMapping(path = Constant.SEARCH_TOP_RESULT, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> searchTop(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ) {

        List<Article> articleResults = articleService.searchArticleByType(
                Constant.ArticleType.ARTICLE.getValue(),pagingRequestModel).getContent();

        List<Article> questionResults = articleService.searchArticleByType(
                Constant.ArticleType.QUESTION.getValue(),pagingRequestModel).getContent();

        List<Tag> tags = tagService.findAllPaging(pagingRequestModel,
                Constant.Status.ACTIVE.getValue()).getContent();

        return responseUtil.successResponse(new TopSearchResult(
                articleResults, questionResults, tags));
    }

    @RequestMapping(path = Constant.SEARCH_BY_TYPE, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> searchByType(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ) {

        if(pagingRequestModel == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        String columnSearch = "all";

        if(pagingRequestModel.getSearchKey().contains(":")) {
            int firstColon = pagingRequestModel.getSearchKey().indexOf(":");
            if (pagingRequestModel.getSearchKey().substring(0, firstColon).equals("title")) {
                pagingRequestModel.setSearchKey(pagingRequestModel.getSearchKey().substring(firstColon + 1));
                columnSearch = "title";
            } else if (pagingRequestModel.getSearchKey().substring(0, firstColon).equals("content")) {
                pagingRequestModel.setSearchKey(pagingRequestModel.getSearchKey().substring(firstColon + 1));
                columnSearch = "content";
            }
        }

        Page<Object[]> results = articleService.searchArticleByTypeAndSort(columnSearch, pagingRequestModel);
        List<SearchResponse> data = new ArrayList<>();


        for(Object[] result: results.getContent()) {
            SearchResponse searchResult = new SearchResponse();
            searchResult.setArticleId(result[0].toString());
            searchResult.setTitle(result[1].toString());
            searchResult.setContent(result[2].toString());
            searchResult.setViewCount(Integer.parseInt(result[3].toString()));
            searchResult.setCreateDate(result[4].toString());
            if(result[5] != null) {
                searchResult.setRightAnswer(true);
            }
            else {
                searchResult.setRightAnswer(false);
            }
            searchResult.setRating(Integer.parseInt(result[6].toString()));
            searchResult.setBookmark(Integer.parseInt(result[7].toString()));
            searchResult.setUserId(result[8].toString());

            List<TagArticle> tags = tagArticleService.findByArticleId(searchResult.getArticleId());
            List<Tag> tagList = new ArrayList<>();
            for(TagArticle tagArticle : tags) {
                Tag tag = tagService.findTagById(tagArticle.getId().getTagId());
                tagList.add(tag);
            }
            searchResult.setTags(tagList);
            data.add(searchResult);
        }

        PagingResponseModel response = new PagingResponseModel();
        response.setData(data);
        response.setOffset(results.getNumber() + 1);
        response.setNumberOfElements(results.getNumberOfElements());
        response.setTotalPages(results.getTotalPages());
        response.setTotalElements(results.getTotalElements());

        return responseUtil.successResponse(response);
    }

}
