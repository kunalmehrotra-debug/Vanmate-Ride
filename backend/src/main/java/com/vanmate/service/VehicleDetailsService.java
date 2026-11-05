package com.vanmate.service;

import com.vanmate.dto.VehicleDetailsDto;
import com.vanmate.entity.VehicleDetails;
import com.vanmate.repository.VehicleDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleDetailsService {

    private final VehicleDetailsRepository vehicleDetailsRepository;

    public VehicleDetailsDto addVehicle(VehicleDetailsDto dto) {
        VehicleDetails vehicle = VehicleDetails.builder()
                .vehicleNumber(dto.getVehicleNumber())
                .vehicleType(dto.getVehicleType())
                .vehicleDescription(dto.getVehicleDescription())
                .date(LocalDate.now())
                .status("Available")
                .deviceId(dto.getDeviceId())
                .build();
        
        return mapToDto(vehicleDetailsRepository.save(vehicle));
    }

    public List<VehicleDetailsDto> getAllVehicles() {
        return vehicleDetailsRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public VehicleDetailsDto getVehicleByNumber(String vehicleNumber) {
        VehicleDetails vehicle = vehicleDetailsRepository.findById(vehicleNumber)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        return mapToDto(vehicle);
    }

    private VehicleDetailsDto mapToDto(VehicleDetails vehicle) {
        return VehicleDetailsDto.builder()
                .vehicleNumber(vehicle.getVehicleNumber())
                .vehicleType(vehicle.getVehicleType())
                .vehicleDescription(vehicle.getVehicleDescription())
                .date(vehicle.getDate())
                .status(vehicle.getStatus())
                .deviceId(vehicle.getDeviceId())
                .build();
    }
}
