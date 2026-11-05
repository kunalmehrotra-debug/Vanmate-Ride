package com.vanmate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDetailsDto {
    private String vehicleNumber;
    private String vehicleType;
    private String vehicleDescription;
    private LocalDate date;
    private String status;
    private String deviceId;
}
