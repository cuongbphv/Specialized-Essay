package com.tlcn.programingforum.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * @author buiph on 16/12/2018
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name = "tag")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Tag {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "com.tlcn.programingforum.util.IDGeneratorUtil")
    private String tagId;

    private String tagName;
    private String description;

    @CreatedDate
    @Column(name = "create_date")
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date createDate;

}
