package com.tlcn.programingforum.api.model;

import com.tlcn.programingforum.model.entity.Article;
import com.tlcn.programingforum.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * @author buiph on 20/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkArticle {
    private Article article;
    private Date bookmarkDate;
}
