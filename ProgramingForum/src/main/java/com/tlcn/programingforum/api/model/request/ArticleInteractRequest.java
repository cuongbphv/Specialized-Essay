package com.tlcn.programingforum.api.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * @author buiph on 18/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleInteractRequest {
    private String articleId;
    private int rating;
    private int bookmark;
    private int share;
    private String userId;
}
