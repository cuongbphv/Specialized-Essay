package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.FollowUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Huy Pham
 */

@Transactional
@Repository
public interface FollowUserRepository extends CrudRepository<FollowUser,String> {


    List<FollowUser> findById_UserId(String userId);

    void deleteById_FollowUserId(String followUserId);

}
