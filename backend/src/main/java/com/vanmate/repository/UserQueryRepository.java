package com.vanmate.repository;

import com.vanmate.entity.UserQuery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserQueryRepository extends JpaRepository<UserQuery, Integer> {
}
