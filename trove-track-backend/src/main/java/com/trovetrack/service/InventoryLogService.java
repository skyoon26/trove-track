package com.trovetrack.service;

import com.trovetrack.dto.InventoryLogDto;
import com.trovetrack.entity.InventoryLog;
import com.trovetrack.entity.Item;
import com.trovetrack.entity.UserEntity;
import com.trovetrack.repository.InventoryLogRepository;
import com.trovetrack.repository.ItemRepository;
import com.trovetrack.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service // Tells Spring to manage this class, contains business logic, allows for dependency injection
@RequiredArgsConstructor // Lombok annotation that allows constructor-based dependency injection
public class InventoryLogService {

    private final InventoryLogRepository inventoryLogRepository;

    private final ItemRepository itemRepository;

    private final UserRepository userRepository;

    private InventoryLogDto convertToInventoryLogDto(InventoryLog inventoryLog) {
        InventoryLogDto inventoryLogDto = new InventoryLogDto();
        inventoryLogDto.setId(inventoryLog.getId());
        inventoryLogDto.setItemId(inventoryLog.getItem().getId());
        inventoryLogDto.setQuantityChanged(inventoryLog.getQuantityChanged());
        inventoryLogDto.setChangeType(inventoryLog.getChangeType());
        inventoryLogDto.setChangeDate(inventoryLog.getChangeDate());
        inventoryLogDto.setChangedByUserId(inventoryLog.getChangedBy().getId());
        inventoryLogDto.setReason(inventoryLog.getReason());

        return inventoryLogDto;
    }

    private InventoryLog convertToInventoryLogEntity(InventoryLogDto inventoryLogDto) {
        InventoryLog inventoryLog = new InventoryLog();
        inventoryLog.setQuantityChanged(inventoryLogDto.getQuantityChanged());
        inventoryLog.setChangeType(inventoryLogDto.getChangeType());
        inventoryLog.setChangeDate(inventoryLogDto.getChangeDate());
        inventoryLog.setReason(inventoryLogDto.getReason());

        Item item = itemRepository.findById(inventoryLogDto.getItemId())
                .orElseThrow(() -> new EntityNotFoundException("Item with ID " + inventoryLogDto.getItemId() + " not found"));
        inventoryLog.setItem(item);

        UserEntity user = userRepository.findById(inventoryLogDto.getChangedByUserId())
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + inventoryLogDto.getChangedByUserId() + " not found"));
        inventoryLog.setChangedBy(user);

        return inventoryLog;
    }

}
