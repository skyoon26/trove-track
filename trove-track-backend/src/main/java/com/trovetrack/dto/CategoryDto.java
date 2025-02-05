package com.trovetrack.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CategoryDto {

    private int id;
    private String name;
    private LocalDateTime dateCreated;
    private List<ItemDto> items;
}
