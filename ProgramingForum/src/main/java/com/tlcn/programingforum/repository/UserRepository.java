package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.api.model.response.UserResponse;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.model.entity.Profile;
import com.tlcn.programingforum.repository.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
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

    @Query(value = "SELECT new com.tlcn.programingforum.api.model.response.UserResponse (u.userId, u.userName, u" +
            ".email, u.phone, u.lang, u.setting, u.createDate, u.lastActivity," +
            "u.role,up.userProfileId, up.firstName, up.lastName, " +
            "up.avatar, up.description, up.websiteLink,up.githubLink, up.position, up.company) " +
            "FROM User u , Profile up " +
            "WHERE u.userId = up.userId AND (u.email LIKE :search or u.userName like :search " +
            "or (u.lang = 'en' AND LOWER(CONCAT(up.firstName, ' ',up.lastName)) like :search) " +
            "or (u.lang = 'vi' AND LOWER(CONCAT(up.lastName, ' ',up.firstName)) like :search)) ")
    Page<UserResponse> findAllPaging(@Param("search") String search, Pageable pageable);
}
