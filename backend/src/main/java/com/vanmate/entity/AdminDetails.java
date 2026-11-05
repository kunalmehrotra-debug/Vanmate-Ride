package com.vanmate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDetails {

    @Id
    @Column(name = "id", length = 45, nullable = false)
    private String id;

    @Column(name = "pass", length = 45, nullable = false)
    private String password;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "email", length = 45, nullable = false)
    private String email;

    @Column(name = "phone", length = 45, nullable = false)
    private String phone;
}
