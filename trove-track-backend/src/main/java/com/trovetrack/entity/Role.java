package com.trovetrack.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {

    @Id // Makes this a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments id by 1
    private int id;

    private String name;
}
