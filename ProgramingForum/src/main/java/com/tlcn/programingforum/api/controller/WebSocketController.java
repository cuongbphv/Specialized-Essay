package com.tlcn.programingforum.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Huy Pham
 */


@Controller
public class WebSocketController {


    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/send")
    @SendTo("/notification/greetings")
    public String onReceiveNotification(
            @Payload String message,
            SimpMessageHeaderAccessor headerAccessor
    ){
                return (new SimpleDateFormat("HH:mm:ss").format(new Date()) + " - " + message);
    }
}
