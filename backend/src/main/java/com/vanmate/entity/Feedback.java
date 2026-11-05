package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "email", length = 45, nullable = false)
    private String email;

    @Column(name = "phone", length = 45)
    private String phone;

    @Column(name = "feedback_text", length = 255, nullable = false)
    private String feedbackText;

    @Column(name = "rating", length = 6, nullable = false)
    private String rating;

    @Column(name = "date", nullable = false)
    private LocalDate date;
}
