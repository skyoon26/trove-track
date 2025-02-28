package com.trovetrack.dto;

import com.trovetrack.entity.ChangeType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class InventoryLogDto {

    private Integer id;
    private Integer itemId;
    private String itemName;
    private Integer quantityChanged;
    private ChangeType changeType;
    private LocalDate changeDate;
    private Integer changedByUserId;
    private String reason;
}
