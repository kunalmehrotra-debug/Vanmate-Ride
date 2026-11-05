package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "booking_request")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requestid")
    private Integer requestid;

    @Column(name = "userid", length = 45, nullable = false)
    private String userid;

    @Column(name = "vehicletype", length = 45, nullable = false)
    private String vehicletype;

    @Column(name = "source", length = 45, nullable = false)
    private String source;

    @Column(name = "destination", length = 45, nullable = false)
    private String destination;

    @Column(name = "timing", length = 45, nullable = false)
    private String timing;

    @Column(name = "no_students", nullable = false)
    private Integer noStudents;

    @Column(name = "status", length = 45)
    private String status;
}
