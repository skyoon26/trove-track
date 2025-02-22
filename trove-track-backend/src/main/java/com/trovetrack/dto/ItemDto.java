package com.trovetrack.dto;

import lombok.Data;

@Data
public class ItemDto {

    private int id;
    private String name;
    private String description;
    private String location;
    private Integer quantity;
    private Double price;
    private Integer minQuantity;
    private Integer categoryId;
    private String asin;
}
