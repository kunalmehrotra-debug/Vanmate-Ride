package com.vanmate.repository;

import com.vanmate.entity.VehicleDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleDetailsRepository extends JpaRepository<VehicleDetails, String> {
}
