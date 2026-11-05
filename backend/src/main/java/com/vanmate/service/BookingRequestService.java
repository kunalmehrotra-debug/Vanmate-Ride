package com.vanmate.service;

import com.vanmate.dto.BookingRequestDto;
import com.vanmate.entity.BookingRequest;
import com.vanmate.repository.BookingRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingRequestService {

    private final BookingRequestRepository bookingRequestRepository;

    public BookingRequestDto createBooking(BookingRequestDto dto) {
        BookingRequest request = BookingRequest.builder()
                .userid(dto.getUserid())
                .vehicletype(dto.getVehicletype())
                .source(dto.getSource())
                .destination(dto.getDestination())
                .timing(dto.getTiming())
                .noStudents(dto.getNoStudents())
                .status("Pending")
                .build();
        
        BookingRequest saved = bookingRequestRepository.save(request);
        dto.setRequestid(saved.getRequestid());
        dto.setStatus(saved.getStatus());
        return dto;
    }

    public List<BookingRequestDto> getAllBookings() {
        return bookingRequestRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public BookingRequestDto updateStatus(Integer id, String status) {
        BookingRequest request = bookingRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        request.setStatus(status);
        return mapToDto(bookingRequestRepository.save(request));
    }

    private BookingRequestDto mapToDto(BookingRequest request) {
        return BookingRequestDto.builder()
                .requestid(request.getRequestid())
                .userid(request.getUserid())
                .vehicletype(request.getVehicletype())
                .source(request.getSource())
                .destination(request.getDestination())
                .timing(request.getTiming())
                .noStudents(request.getNoStudents())
                .status(request.getStatus())
                .build();
    }
}
