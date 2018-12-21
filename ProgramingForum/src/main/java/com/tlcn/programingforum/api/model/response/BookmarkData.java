package com.tlcn.programingforum.api.model.response;

import com.tlcn.programingforum.model.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author buiph on 21/12/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkData {
    private Article article;
    private Date bookmarkDate;
}
