package com.tlcn.programingforum.api.model.response;

import com.tlcn.programingforum.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * @author buiph on 02/01/2019
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {
    private String articleId;
    private String title;
    private String content;
    private String createDate;
    private String userId;
    private int viewCount;
    private int bookmark;
    private int rating;
    private boolean rightAnswer;
    private List<Tag> tags;
}
