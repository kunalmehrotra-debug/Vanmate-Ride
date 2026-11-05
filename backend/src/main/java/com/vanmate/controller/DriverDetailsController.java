package com.vanmate.controller;

import com.vanmate.dto.DriverDetailsDto;
import com.vanmate.service.DriverDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/drivers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DriverDetailsController {

    private final DriverDetailsService driverDetailsService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DriverDetailsDto> addDriver(@RequestBody DriverDetailsDto dto) {
        return ResponseEntity.ok(driverDetailsService.addDriver(dto));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PARENT', 'SCHOOL')")
    public ResponseEntity<List<DriverDetailsDto>> getAllDrivers() {
        return ResponseEntity.ok(driverDetailsService.getAllDrivers());
    }
}
