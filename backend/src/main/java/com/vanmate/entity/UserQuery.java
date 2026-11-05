package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "user_query")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserQuery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "serial_number")
    private Integer serialNumber;

    @Column(name = "user_name", length = 45, nullable = false)
    private String userName;

    @Column(name = "user_email", length = 45, nullable = false)
    private String userEmail;

    @Column(name = "user_phone", length = 45)
    private String userPhone;

    @Column(name = "user_doubt", length = 45, nullable = false)
    private String userDoubt;

    @Column(name = "date", nullable = false)
    private LocalDate date;
}
