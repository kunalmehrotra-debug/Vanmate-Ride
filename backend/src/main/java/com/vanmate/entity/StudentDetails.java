package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stid")
    private Integer stid;

    @Column(name = "student_name", length = 60, nullable = false)
    private String studentName;

    @Column(name = "standard", length = 45, nullable = false)
    private String standard;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "school_name", length = 75, nullable = false)
    private String schoolName;

    @Column(name = "userid", length = 45, nullable = false)
    private String userid;

    @Column(name = "status", length = 45)
    private String status;

    @Column(name = "requestid", length = 45)
    private String requestid;

    @Column(name = "vehicle_number", length = 45)
    private String vehicleNumber;
}
