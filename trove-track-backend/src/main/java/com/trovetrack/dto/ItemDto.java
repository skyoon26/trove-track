package com.trovetrack.dto;

import lombok.Data;

@Data
public class ItemDto {

    private int id;
    private String name;
    private String description;
    private String location;
    private int quantity;
    private double price;
    private String categoryName;
}
