package com.tlcn.programingforum.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author buiph on 22/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagData {
    private String tagId;
    private String tagName;
    private String description;
    private Date createDate;
    private int numOfArticle;
    private int numOfQuestion;
    private long numOfFollower;
    private boolean followStatus;
}
