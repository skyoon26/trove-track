package com.trovetrack.dto;

import lombok.Data;

@Data
public class OrderItemDto {

    private Integer id;
    private Integer itemId;
    private Integer orderId;
    private Integer quantity;
    private Double priceAtOrder;
}
