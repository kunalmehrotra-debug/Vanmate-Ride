package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "notice")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noticeid")
    private Integer noticeid;

    @Column(name = "topic", length = 45, nullable = false)
    private String topic;

    @Column(name = "contents", length = 255, nullable = false)
    private String contents;

    @Column(name = "date", nullable = false)
    private LocalDate date;
}
