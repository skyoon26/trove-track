package com.trovetrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Tells Spring Boot this is a JPA entity
@Table(name = "users") // Sets the table name to users
@Data // Gets boilerplate code from Lombok
@NoArgsConstructor // Generates a no-argument constructor from Lombok required by JPA
public class UserEntity {

    @Id // Makes this a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments id by 1
    private int id;

    @Column(unique = true, nullable = false) // Ensures all values in the column must be unique and cannot be null
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Email
    @Column(unique = true, nullable = false)
    private String email;

}
