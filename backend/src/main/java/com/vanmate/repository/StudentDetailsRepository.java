package com.vanmate.repository;

import com.vanmate.entity.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDetailsRepository extends JpaRepository<StudentDetails, Integer> {
}
