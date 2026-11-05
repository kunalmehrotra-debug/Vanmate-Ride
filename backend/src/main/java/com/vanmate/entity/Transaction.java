package com.vanmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "userid", length = 45, nullable = false)
    private String userid;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "email", length = 45, nullable = false)
    private String email;

    @Column(name = "phone", length = 45, nullable = false)
    private String phone;

    @Column(name = "charge", nullable = false)
    private Integer charge;

    @Column(name = "transactionid", length = 45)
    private String transactionid;

    @Column(name = "requestid")
    private Integer requestid;
}
