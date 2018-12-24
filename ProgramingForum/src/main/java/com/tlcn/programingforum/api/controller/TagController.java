package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.request.FollowTagRequest;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.TagResponse;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.RestAPIResponse;
import com.tlcn.programingforum.model.entity.*;
import com.tlcn.programingforum.model.entity.key.TagUserPK;
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

    @Autowired
    FollowTagService followTagService;

    @Autowired
    UserService userService;

    @RequestMapping(path = Constant.WITHIN_ID, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getMostTagUsedInForum(
            HttpServletRequest request,
            @PathVariable("id") String tagId
    ) {
        Object tagInfo = tagService.getTagInfomation(tagId);

        return responseUtil.successResponse(tagInfo);
    }


    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<RestAPIResponse> updateTag(
            HttpServletRequest request,
            @RequestBody Tag tagReq
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.MODERATOR.getId());

        Tag tag = tagService.findTagById(tagReq.getTagId());
        if(tag == null){
            throw new ApplicationException(APIStatus.ERR_TAG_NOT_FOUND);
        }

        tag.setDescription(tagReq.getDescription());
        tagService.saveTag(tag);

        return responseUtil.successResponse("Updated");
    }


    @RequestMapping(path = Constant.WITHIN_ID, method = RequestMethod.DELETE)
    public ResponseEntity<RestAPIResponse> deleteTag(
            HttpServletRequest request,
            @PathVariable("id") String tagId
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.SYS_ADMIN.getId());

        Tag tag = tagService.findTagById(tagId);
        if(tag == null){
            throw new ApplicationException(APIStatus.ERR_TAG_NOT_FOUND);
        }

        tagArticleService.deleteByTagId(tag.getTagId());
        followTagService.deleteByTagId(tag.getTagId());
        tagService.deleteTag(tag);

        return responseUtil.successResponse("Deleted");
    }


    @RequestMapping(path = Constant.LIST_TAG, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getListTag(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.SYS_ADMIN.getId());

        Page<Tag> tags = tagService.findAllPaging(pagingRequestModel);

        return responseUtil.successResponse(tags);
    }

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
        List<Article> articles = articleService.findByUserIdAndStatus(
                userId, Constant.Status.ACTIVE.getValue());

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

    @RequestMapping(path = Constant.LIST_FOLLOWER_BY_TAG, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getListFollower(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
            ) {

        Page<FollowTag> followers = followTagService.getListFollowers(
                pagingRequestModel.getSearchKey(), pagingRequestModel);

        return responseUtil.successResponse(followers);
    }

    @RequestMapping(path = Constant.LIST_ARTICLE_BY_TYPE, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getListArticleByType(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ) {

        Page<Article> articles = articleService.getArticleByTagIdAndType(pagingRequestModel);

        return responseUtil.successResponse(articles);
    }

    @RequestMapping(path = Constant.FOLLOW_TAG, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> followTag(
            HttpServletRequest request,
            @RequestBody FollowTagRequest followTagRequest
            ) {

        if (followTagRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        FollowTag followTag = new FollowTag();
        followTag.setId(new TagUserPK(followTagRequest.getTagId(), followTagRequest.getUserId()));
        followTag.setCreateDate(new Date());
        followTagService.followTag(followTag);

        return responseUtil.successResponse("Follow tag successfully");
    }

    @RequestMapping(path = Constant.UNFOLLOW_TAG, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> unfollowTag(
            HttpServletRequest request,
            @RequestBody FollowTagRequest followTagRequest
    ) {

        if (followTagRequest == null) {
            throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        }

        FollowTag followTag = followTagService.findFollowTag(followTagRequest.getTagId(), followTagRequest.getUserId());
        if(followTag != null) {
            followTagService.unfollowTag(followTag);
        }

        return responseUtil.successResponse("Unfollow tag successfully");
    }

    @RequestMapping(path = Constant.FOLLOW_STATUS, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getFollowStatusTag(
            HttpServletRequest request,
            @RequestParam("tag_id") String tagId,
            @RequestParam("user_id") String userId
    ) {

        FollowTag followTag = followTagService.findFollowTag(tagId, userId);

        return responseUtil.successResponse(followTag);
    }

}
