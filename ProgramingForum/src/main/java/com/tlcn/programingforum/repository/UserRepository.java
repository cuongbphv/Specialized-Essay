package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.api.model.response.UserResponse;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.model.entity.Profile;
import com.tlcn.programingforum.repository.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Huy Pham
 */

@Repository
@Transactional
public interface UserRepository extends PagingAndSortingRepository<User,String> {

    User findByUserIdAndStatus(String userId, int status);

    User findByEmailAndStatus(String email, int status);

    User findByUserNameAndStatus(String userName, int status);

//    @Query("SELECT new com.tlcn.programingforum.api.model.response.UserResponse (userId, u.userName, u.email, u.phone, u.lang, u.setting, u.createDate, u.lastActivity,u.role," +
//            "up.userProfileId, up.firstName, up.lastName, up.avatar, up.description, up.websiteLink," +
//            "up.githubLink, up.position, up.company) FROM  User u, Profile up WHERE u.userId = up.userId")
//    Page<UserResponse> findAllPaging(UserSpecification userSpecification, PageRequest pageRequest);
}
