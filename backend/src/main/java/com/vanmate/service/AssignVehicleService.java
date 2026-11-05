package com.vanmate.service;

import com.vanmate.dto.AssignVehicleDto;
import com.vanmate.entity.AssignVehicle;
import com.vanmate.repository.AssignVehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignVehicleService {

    private final AssignVehicleRepository assignVehicleRepository;

    public AssignVehicleDto assign(AssignVehicleDto dto) {
        AssignVehicle assignment = AssignVehicle.builder()
                .vehicleno(dto.getVehicleno())
                .driverid(dto.getDriverid())
                .build();
        return mapToDto(assignVehicleRepository.save(assignment));
    }

    public List<AssignVehicleDto> getAllAssignments() {
        return assignVehicleRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private AssignVehicleDto mapToDto(AssignVehicle assignment) {
        return AssignVehicleDto.builder()
                .assignid(assignment.getAssignid())
                .vehicleno(assignment.getVehicleno())
                .driverid(assignment.getDriverid())
                .build();
    }
}
