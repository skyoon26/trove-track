package com.trovetrack.repository;

import com.trovetrack.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username); // Query method to find a user by their username
    Boolean existsByUsername(String username); // Query method to check if the user exists
}
