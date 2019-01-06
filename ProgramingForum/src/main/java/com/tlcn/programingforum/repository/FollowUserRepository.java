package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.FollowUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;

/**
 * @author Huy Pham
 */

@Transactional
@Repository
public interface FollowUserRepository extends PagingAndSortingRepository<FollowUser,String> {


    FollowUser findById_UserIdAndId_FollowUserId(String userId, String followUserId);

    List<FollowUser> findById_UserId(String userId);

    List<FollowUser> findById_FollowUserId(String followUserId);

    void deleteById_FollowUserId(String followUserId);

    @Query("SELECT fu FROM FollowUser fu GROUP BY fu.id.followUserId ORDER BY count(fu)")
    List<FollowUser> getTopFollowUser(Pageable pageable);

}
