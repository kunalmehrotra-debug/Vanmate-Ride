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
@Table(name = "vehicle_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleDetails {

    @Id
    @Column(name = "vehicle_number", length = 45, nullable = false)
    private String vehicleNumber;

    @Column(name = "vehicle_type", length = 45, nullable = false)
    private String vehicleType;

    @Column(name = "vehicle_description", length = 200, nullable = false)
    private String vehicleDescription;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "status", length = 45)
    private String status;

    @Column(name = "device_id", length = 45)
    private String deviceId;
}
