package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "assign_vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assignid")
    private Integer assignid;

    @Column(name = "vehicleno", length = 45, nullable = false)
    private String vehicleno;

    @Column(name = "driverid", nullable = false)
    private Integer driverid;
}
