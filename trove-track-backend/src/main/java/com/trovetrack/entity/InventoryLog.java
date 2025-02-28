package com.trovetrack.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "inventory_logs")
@Data
@NoArgsConstructor
@EqualsAndHashCode
public class InventoryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    private int quantityChanged;

    @Enumerated(EnumType.STRING) // Stores the value as a string in the database
    private ChangeType changeType;

    private LocalDate changeDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity changedBy;

    private String reason;

}
