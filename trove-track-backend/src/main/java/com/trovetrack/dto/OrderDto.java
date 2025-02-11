package com.trovetrack.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDto {

    private int id;
    private String orderNumber;
    private String vendorName;
    private List<OrderItemDto> orderItems;
}
