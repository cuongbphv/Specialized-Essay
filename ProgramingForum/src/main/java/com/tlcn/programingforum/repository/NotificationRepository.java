package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.model.entity.Notification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Huy Pham
 */


@Repository
@Transactional
public interface NotificationRepository extends CrudRepository<Notification, String> {
}
