package com.tlcn.programingforum.model.entity;

import com.tlcn.programingforum.model.entity.key.ArticleUserPK;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author buiph on 18/12/2018
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name = "report_article")
public class ReportArticle {

    @EmbeddedId
    ArticleUserPK id;

    private String reason;

}
