package com.trovetrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@EqualsAndHashCode
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    private double priceAtOrder;

    private double total;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    public double getTotal() {
        return this.quantity * this.priceAtOrder;
    }
}
