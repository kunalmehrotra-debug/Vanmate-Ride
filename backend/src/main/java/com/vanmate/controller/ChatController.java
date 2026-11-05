package com.vanmate.controller;

import com.vanmate.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now());
        // In a real app, save to MessageRepository here.

        // Broadcast the message to the recipient's private topic
        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(), "/topic/messages",
                chatMessage
        );
    }
}
