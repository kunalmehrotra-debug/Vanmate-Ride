package com.vanmate.controller;

import com.vanmate.dto.BookingRequestDto;
import com.vanmate.service.BookingRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingRequestController {

    private final BookingRequestService bookingRequestService;

    @PostMapping
    @PreAuthorize("hasRole('PARENT') or hasRole('SCHOOL')")
    public ResponseEntity<BookingRequestDto> createBooking(@RequestBody BookingRequestDto dto) {
        return ResponseEntity.ok(bookingRequestService.createBooking(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingRequestDto>> getAllBookings() {
        return ResponseEntity.ok(bookingRequestService.getAllBookings());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingRequestDto> updateBookingStatus(
            @PathVariable Integer id,
            @RequestParam String status) {
        return ResponseEntity.ok(bookingRequestService.updateStatus(id, status));
    }
}
