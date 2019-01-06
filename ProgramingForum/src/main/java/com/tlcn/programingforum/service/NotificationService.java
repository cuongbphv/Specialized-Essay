package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.Notification;

/**
 * @author Huy Pham
 */


public interface NotificationService {

    Notification save(Notification notification);

    Notification getById(String id);

    void delete(String id);
}
