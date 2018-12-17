package com.tlcn.programingforum.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author buiph on 16/12/2018
 */

@Embeddable
@Getter
@Setter
public class TagArticlePK implements Serializable {
    @Column(name = "tag_id")
    private String tagId;
    @Column(name = "article_id")
    private String articleId;
}
