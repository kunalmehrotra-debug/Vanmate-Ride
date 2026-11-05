package com.vanmate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "parent")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parent {

    @Id
    @Column(name = "id", length = 45, nullable = false)
    private String id;

    @Column(name = "password", length = 45, nullable = false)
    private String password;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "email", length = 45, nullable = false)
    private String email;

    @Column(name = "phone", length = 10, nullable = false)
    private String phone;

    @Column(name = "city", length = 45, nullable = false)
    private String city;

    @Column(name = "address", length = 100, nullable = false)
    private String address;

    @Column(name = "date", nullable = false)
    private LocalDate date;
}
