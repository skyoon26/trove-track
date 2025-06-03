package com.trovetrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "items")
@Data
@NoArgsConstructor
public class Item {

    @Id // Makes this a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments id by 1
    private int id;

    @NotBlank(message = "Item name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    private String description;

    private String location;

    @Min(value = 0, message = "Quantity cannot be negative")
    private int quantity;

    @DecimalMin(value = "0.0", message = "Price cannot be negative")
    private double price;

    @Min(value = 0, message = "Minimum quantity cannot be negative")
    private int minQuantity;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    @ToString.Exclude
    private Category category;

    private String asin;
}
