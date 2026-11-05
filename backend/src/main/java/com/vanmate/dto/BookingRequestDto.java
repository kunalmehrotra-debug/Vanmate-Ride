package com.vanmate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestDto {
    private Integer requestid;
    private String userid;
    private String vehicletype;
    private String source;
    private String destination;
    private String timing;
    private Integer noStudents;
    private String status;
}
