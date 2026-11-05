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
public class DriverDetailsDto {
    private Integer id;
    private String dname;
    private String phone;
    private String experience;
    private String licenseno;
    private LocalDate validity;
    private String address;
    private String photo;
    private LocalDate date;
    private String vehicleNumber;
}
