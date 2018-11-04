package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.User;
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
}
