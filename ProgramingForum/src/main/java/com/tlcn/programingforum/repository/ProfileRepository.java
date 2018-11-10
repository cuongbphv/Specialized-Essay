package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Profile;
import com.tlcn.programingforum.model.entity.Session;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Huy Pham
 */

@Transactional
@Repository
public interface ProfileRepository extends CrudRepository<Profile, String> {

    Profile getProfileByUserId(String userId);

}
