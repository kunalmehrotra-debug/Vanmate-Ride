package com.vanmate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignVehicleDto {
    private Integer assignid;
    private String vehicleno;
    private Integer driverid;
}
