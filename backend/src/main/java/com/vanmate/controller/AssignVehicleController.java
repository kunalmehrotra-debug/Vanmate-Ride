package com.vanmate.controller;

import com.vanmate.dto.AssignVehicleDto;
import com.vanmate.service.AssignVehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/assignments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AssignVehicleController {

    private final AssignVehicleService assignVehicleService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AssignVehicleDto> assignVehicle(@RequestBody AssignVehicleDto dto) {
        return ResponseEntity.ok(assignVehicleService.assign(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AssignVehicleDto>> getAllAssignments() {
        return ResponseEntity.ok(assignVehicleService.getAllAssignments());
    }
}
