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
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author Huy Pham
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name = "session")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Session implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "com.tlcn.programingforum.util.IDGeneratorUtil")
    @Column(name = "token_id", nullable = false, length = 32)
    private String tokenId;
    private String userId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;
    @CreatedDate
    @Column(name = "login_date", nullable = false)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date loginDate;
    private String sessionData;
}
