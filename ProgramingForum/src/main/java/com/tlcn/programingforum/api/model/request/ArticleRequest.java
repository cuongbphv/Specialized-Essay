package com.tlcn.programingforum.api.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * @author buiph on 16/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleRequest {
    private String articleId;
    private String title;
    private List<String> tags;
    private String content;
    private String type;
    private String userId;
    private String rightAnswerId;
}
