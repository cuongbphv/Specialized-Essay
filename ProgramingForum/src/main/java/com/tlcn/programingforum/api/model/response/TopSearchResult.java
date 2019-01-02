package com.tlcn.programingforum.api.model.response;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * @author buiph on 02/01/2019
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TopSearchResult {
    private List<Article> articleResults;
    private List<Article> questionResults;
    private List<Tag> tagResults;
}
