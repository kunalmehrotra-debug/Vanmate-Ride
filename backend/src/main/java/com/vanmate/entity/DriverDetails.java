package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "driver_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "dname", length = 45, nullable = false)
    private String dname;

    @Column(name = "phone", length = 45, nullable = false)
    private String phone;

    @Column(name = "experience", length = 45, nullable = false)
    private String experience;

    @Column(name = "licenseno", length = 45, nullable = false)
    private String licenseno;

    @Column(name = "validity", nullable = false)
    private LocalDate validity;

    @Column(name = "address", length = 150, nullable = false)
    private String address;

    @Column(name = "photo", length = 255)
    private String photo;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "vehicle_number", length = 45)
    private String vehicleNumber;
}
