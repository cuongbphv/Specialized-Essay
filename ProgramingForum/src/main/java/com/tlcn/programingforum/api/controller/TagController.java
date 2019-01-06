package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.model.TagData;
import com.tlcn.programingforum.api.model.request.FollowTagRequest;
import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.PagingResponseModel;
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
import org.springframework.data.domain.PageRequest;
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

    @RequestMapping(path = Constant.WITHIN_ID, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getTag(
            HttpServletRequest request,
            @PathVariable("id") String tagId
    ) {
        Tag tag = tagService.findTagById(tagId);

        return responseUtil.successResponse(tag);
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
        tag.setStatus(tagReq.getStatus());
        tagService.saveTag(tag);

        return responseUtil.successResponse("Updated");
    }


    @RequestMapping(path = Constant.WITHIN_ID, method = RequestMethod.DELETE)
    public ResponseEntity<RestAPIResponse> deleteTag(
            HttpServletRequest request,
            @PathVariable("id") String tagId
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.MODERATOR.getId());

        Tag tag = tagService.findTagById(tagId);
        if(tag == null){
            throw new ApplicationException(APIStatus.ERR_TAG_NOT_FOUND);
        }

        tag.setStatus(Constant.Status.DELETE.getValue());
        tagService.saveTag(tag);

        return responseUtil.successResponse("Deleted");
    }


    @RequestMapping(path = Constant.LIST_TAG, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getListTag(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.MODERATOR.getId());

        Page<Tag> tags = tagService.findAllPaging(pagingRequestModel, Constant.Status.ACTIVE.getValue());

        return responseUtil.successResponse(tags);
    }

    @RequestMapping(path = Constant.LIST_BANNED_TAG, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getListBannedTag(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ) {

        AuthUser authUser = getAuthUserFromSession(request);
        validatePermission(authUser, Constant.SystemRole.MODERATOR.getId());

        Page<Tag> tags = tagService.findAllPaging(pagingRequestModel, Constant.Status.DELETE.getValue());

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

    @RequestMapping(path = Constant.ALL_TAGS, method = RequestMethod.POST)
    public ResponseEntity<RestAPIResponse> getAllTags(
            HttpServletRequest request,
            @RequestBody PagingRequestModel pagingRequestModel
    ){

        List<Object[]> tags = tagService.getAllTags(pagingRequestModel);
        List<TagData> data = new ArrayList<>();

        for(Object[] tag : tags) {
            TagData tagData = new TagData();
            tagData.setTagId(tag[0].toString());
            tagData.setTagName(tag[1].toString());
            tagData.setDescription(tag[2].toString());
//            if(tag[3] != null) {
//                tagData.setCreateDate(new Date(tag[3].toString()));
//            }
            tagData.setNumOfArticle(Integer.parseInt(tag[4].toString()));
            tagData.setNumOfQuestion(Integer.parseInt(tag[5].toString()));
            tagData.setNumOfFollower(Integer.parseInt(tag[6].toString()));
            if(followTagService.findFollowTag(tag[0].toString(), pagingRequestModel.getUserId()) != null) {
                tagData.setFollowStatus(true);
            }
            else {
                tagData.setFollowStatus(false);
            }
            data.add(tagData);
        }

        return responseUtil.successResponse(data);
    }

    @RequestMapping(path = Constant.LIST_TAG_BY_USER + Constant.WITHIN_ID, method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> getListTagByUserId(
            HttpServletRequest request,
            @PathVariable("id") String userId
    ) {

        List<Tag> tagList = new ArrayList<>();

        List<FollowTag> followTagList = followTagService.findByUserId(userId);

        if(followTagList != null){
            for(FollowTag followTag : followTagList){
                Tag tag = tagService.findTagById(followTag.getId().getTagId());
                if(tag != null){
                    tagList.add(tag);
                }
            }
        }

        return responseUtil.successResponse(tagList);
    }
}
