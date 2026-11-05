package com.vanmate.controller;

import com.vanmate.dto.VehicleDetailsDto;
import com.vanmate.service.VehicleDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VehicleDetailsController {

    private final VehicleDetailsService vehicleDetailsService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VehicleDetailsDto> addVehicle(@RequestBody VehicleDetailsDto dto) {
        return ResponseEntity.ok(vehicleDetailsService.addVehicle(dto));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PARENT', 'SCHOOL')")
    public ResponseEntity<List<VehicleDetailsDto>> getAllVehicles() {
        return ResponseEntity.ok(vehicleDetailsService.getAllVehicles());
    }

    @GetMapping("/{vehicleNumber}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PARENT', 'SCHOOL')")
    public ResponseEntity<VehicleDetailsDto> getVehicle(@PathVariable String vehicleNumber) {
        return ResponseEntity.ok(vehicleDetailsService.getVehicleByNumber(vehicleNumber));
    }
}
