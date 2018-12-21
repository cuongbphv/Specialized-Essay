package com.tlcn.programingforum.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author buiph on 21/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TopAuthorResponse {
    private String userId;
    private String firstName;
    private String lastName;
    private int rating;
    private int bookmark;
    private int share;
    private int viewCount;
}
