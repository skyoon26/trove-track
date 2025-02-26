package com.trovetrack.dto;

import com.trovetrack.entity.ChangeType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryLogDto {

    private Integer id;
    private Integer itemId;
    private Integer quantityChanged;
    private ChangeType changeType;
    private LocalDateTime changeDate;
    private Integer changedByUserId;
    private String reason;
}
