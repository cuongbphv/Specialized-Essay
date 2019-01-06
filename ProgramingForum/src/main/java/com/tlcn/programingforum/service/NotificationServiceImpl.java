package com.tlcn.programingforum.service;

import com.sun.nio.sctp.Association;
import com.tlcn.programingforum.model.entity.Notification;
import com.tlcn.programingforum.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * @author Huy Pham
 */

@Service
public class NotificationServiceImpl implements NotificationService {


    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public Notification save(Notification notification) {

        this.simpMessagingTemplate.convertAndSend("/notification/" +
                notification.getNotificationPK().getToUserId(), notification);

        return notificationRepository.save(notification);
    }

    @Override
    public Notification getById(String id) {
        return notificationRepository.findById(id).get();
    }

    @Override
    public void delete(String id) {
        notificationRepository.deleteById(id);
    }
}
