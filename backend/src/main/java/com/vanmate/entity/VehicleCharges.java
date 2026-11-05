package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicle_charges")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleCharges {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "vehicle_type", length = 45, nullable = false)
    private String vehicleType;

    @Column(name = "charge", nullable = false)
    private Integer charge;

    @Column(name = "description", length = 255, nullable = false)
    private String description;
}
