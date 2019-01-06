package com.tlcn.programingforum.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author buiph on 18/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TopTagResponse {
    private String tagId;
    private String tagName;
    private Date createDate;
    private String description;
    private int numberOfTaged;
}
