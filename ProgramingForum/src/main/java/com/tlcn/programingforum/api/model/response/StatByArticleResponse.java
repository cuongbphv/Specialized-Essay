package com.tlcn.programingforum.api.model.response;

import com.tlcn.programingforum.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * @author buiph on 19/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatByArticleResponse {
    private int rating;
    private int bookmark;
    private int share;
    private int commentNum;
    private List<Tag> tags;
}
