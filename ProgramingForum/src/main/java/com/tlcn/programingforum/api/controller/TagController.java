package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.ArticleRequest;
import com.tlcn.programingforum.api.model.response.TopTagResponse;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.Tag;
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


    @RequestMapping(path = Constant.MOST_TAG_IN_FORUM, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getMostTagUsedInForum(
            HttpServletRequest request
    ) {
        List<Object> tagList = tagService.findMostTagInForum();

        return responseUtil.successResponse(tagList);
    }
}
