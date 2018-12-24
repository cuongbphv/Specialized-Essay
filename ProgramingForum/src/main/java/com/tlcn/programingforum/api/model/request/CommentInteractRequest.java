package com.tlcn.programingforum.api.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author buiph on 24/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentInteractRequest {
    private String commentId;
    private String userId;
    private int rating;
}
