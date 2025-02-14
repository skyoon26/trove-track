package com.trovetrack.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {

    private int id;
    private LocalDateTime orderDate;
    private String orderNumber;
    private String vendorName;
    private List<OrderItemDto> orderItems;
}
