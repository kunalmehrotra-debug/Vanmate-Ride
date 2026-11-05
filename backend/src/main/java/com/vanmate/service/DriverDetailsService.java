package com.vanmate.service;

import com.vanmate.dto.DriverDetailsDto;
import com.vanmate.entity.DriverDetails;
import com.vanmate.repository.DriverDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverDetailsService {

    private final DriverDetailsRepository driverDetailsRepository;

    public DriverDetailsDto addDriver(DriverDetailsDto dto) {
        DriverDetails driver = DriverDetails.builder()
                .dname(dto.getDname())
                .phone(dto.getPhone())
                .experience(dto.getExperience())
                .licenseno(dto.getLicenseno())
                .validity(dto.getValidity())
                .address(dto.getAddress())
                .photo(dto.getPhoto())
                .date(LocalDate.now())
                .vehicleNumber(dto.getVehicleNumber())
                .build();
        return mapToDto(driverDetailsRepository.save(driver));
    }

    public List<DriverDetailsDto> getAllDrivers() {
        return driverDetailsRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private DriverDetailsDto mapToDto(DriverDetails driver) {
        return DriverDetailsDto.builder()
                .id(driver.getId())
                .dname(driver.getDname())
                .phone(driver.getPhone())
                .experience(driver.getExperience())
                .licenseno(driver.getLicenseno())
                .validity(driver.getValidity())
                .address(driver.getAddress())
                .photo(driver.getPhoto())
                .date(driver.getDate())
                .vehicleNumber(driver.getVehicleNumber())
                .build();
    }
}
