package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.response.TopAuthorResponse;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.service.UserService;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

/**
 * @author buiph on 21/12/2018
 */

@RestController
@RequestMapping(Constant.AUTHOR_CONTROLLER)
public class AuthorController extends AbstractBasedAPI {

    @Autowired
    UserService userService;

    @RequestMapping(path = Constant.TOP_AUTHOR, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getTrendingArticle(
            HttpServletRequest request) {

        List<Object[]> topAuthors = userService.getTopAuthors();

        List<TopAuthorResponse> responses = new ArrayList<>();

        for(Object[] author : topAuthors) {
            TopAuthorResponse tar = new TopAuthorResponse();
            tar.setUserId(author[0].toString());
            tar.setFirstName(author[1].toString());
            tar.setLastName(author[2].toString());
            tar.setRating(Integer.parseInt(author[3].toString()));
            tar.setBookmark(Integer.parseInt(author[4].toString()));
            tar.setShare(Integer.parseInt(author[5].toString()));
            tar.setViewCount(Integer.parseInt(author[6].toString()));
            tar.setAvatar(author[7].toString());
            responses.add(tar);
        }

        return responseUtil.successResponse(responses);
    }

}
