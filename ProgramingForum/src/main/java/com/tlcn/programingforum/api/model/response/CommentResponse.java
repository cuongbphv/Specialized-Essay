package com.tlcn.programingforum.api.model.response;

import com.tlcn.programingforum.model.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * @author buiph on 19/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private String commentId;
    private String articleId;
    private String userId;
    private String content;
    private String parentId;
    private Date createDate;
    private List<Comment> childComments;
}
