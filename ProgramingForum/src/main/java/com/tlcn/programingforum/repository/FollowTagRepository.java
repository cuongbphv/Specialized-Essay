package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.FollowTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author buiph on 21/12/2018
 */

@Transactional
@Repository
public interface FollowTagRepository extends CrudRepository<FollowTag, String> {
    FollowTag findByIdTagIdAndIdUserId(String tagId, String userId);

    @Query(value = "SELECT * FROM follow_tag ft WHERE ft.tag_id = ?1 ORDER BY ?#{#pageable}",
            countQuery = "SELECT COUNT(*) FROM follow_tag ft WHERE ft.tag_id = ?1 ",
            nativeQuery = true)
    Page<FollowTag> findByIdTagId(String tagId, PageRequest pageRequest);

    void deleteById_TagId(String tagId);
}
