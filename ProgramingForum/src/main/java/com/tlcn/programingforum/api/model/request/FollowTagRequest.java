package com.tlcn.programingforum.api.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * @author buiph on 21/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowTagRequest {
    private String tagId;
    private String userId;
}
