package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "messageid")
    private Integer messageid;

    @Column(name = "senderid", length = 45, nullable = false)
    private String senderid;

    @Column(name = "receiverid", length = 45, nullable = false)
    private String receiverid;

    @Column(name = "subject", length = 100, nullable = false)
    private String subject;

    @Column(name = "message_text", length = 255, nullable = false)
    private String messageText;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "sstatus", length = 10, nullable = false)
    private String sstatus;

    @Column(name = "rstatus", length = 10, nullable = false)
    private String rstatus;
}
