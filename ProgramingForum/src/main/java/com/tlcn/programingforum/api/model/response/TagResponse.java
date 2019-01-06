package com.tlcn.programingforum.api.model.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author Huy Pham
 */


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TagResponse {

    private String tagId;
    private String tagName;
    private String description;
    private Date createDate;
    private long markedTime;
    private long numberFollower;

}
