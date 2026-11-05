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
@Table(name = "school")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class School {

    @Id
    @Column(name = "id", length = 45, nullable = false)
    private String id;

    @Column(name = "password", length = 45, nullable = false)
    private String password;

    @Column(name = "sname", length = 45, nullable = false)
    private String sname;

    @Column(name = "email", length = 45, nullable = false)
    private String email;

    @Column(name = "phone", length = 10, nullable = false)
    private String phone;

    @Column(name = "board", length = 45, nullable = false)
    private String board;

    @Column(name = "city", length = 45, nullable = false)
    private String city;

    @Column(name = "owner", length = 45, nullable = false)
    private String owner;

    @Column(name = "address", length = 100, nullable = false)
    private String address;

    @Column(name = "stype", length = 45, nullable = false)
    private String stype;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "latitude", precision = 10, scale = 6)
    private java.math.BigDecimal latitude;

    @Column(name = "longitude", precision = 11, scale = 6)
    private java.math.BigDecimal longitude;
}
