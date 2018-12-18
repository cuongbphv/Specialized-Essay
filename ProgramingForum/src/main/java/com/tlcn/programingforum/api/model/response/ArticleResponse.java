package com.tlcn.programingforum.api.model.response;

import com.tlcn.programingforum.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * @author buiph on 17/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponse {
    private String articleId;
    private String title;
    private String content;
    private int viewCount;
    private Date createDate;
    private int type;
    private String rightAnswerId;
    private String thumbnail;
    private boolean isApproved;
    private String userId;
    private List<Tag> tagList;
}
