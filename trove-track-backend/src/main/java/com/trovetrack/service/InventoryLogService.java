package com.trovetrack.service;

import com.trovetrack.dto.InventoryLogDto;
import com.trovetrack.entity.ChangeType;
import com.trovetrack.entity.InventoryLog;
import com.trovetrack.entity.Item;
import com.trovetrack.entity.UserEntity;
import com.trovetrack.repository.InventoryLogRepository;
import com.trovetrack.repository.ItemRepository;
import com.trovetrack.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service // Tells Spring to manage this class, contains business logic, allows for dependency injection
@RequiredArgsConstructor // Lombok annotation that allows constructor-based dependency injection
public class InventoryLogService {

    private final InventoryLogRepository inventoryLogRepository;

    private final ItemRepository itemRepository;

    private final UserRepository userRepository;

    public InventoryLogDto createInventoryLog(InventoryLogDto inventoryLogDto) {
        InventoryLog newLog = convertToInventoryLogEntity(inventoryLogDto);
        newLog.setChangeDate(LocalDateTime.now());

        Item item = newLog.getItem();
        if (newLog.getChangeType() == ChangeType.RESTOCK) {
            item.setQuantity(item.getQuantity() + inventoryLogDto.getQuantityChanged());
        } else if (newLog.getChangeType() == ChangeType.USAGE) {
            item.setQuantity(item.getQuantity() - inventoryLogDto.getQuantityChanged());
        }
        itemRepository.save(item);

        InventoryLog savedLog = inventoryLogRepository.save(newLog);

        return convertToInventoryLogDto(savedLog);
    }

    public List<InventoryLogDto> getAllLogs() {
        List<InventoryLog> logs = inventoryLogRepository.findAll();
        List<InventoryLogDto> logDtos = new ArrayList<>();

        for (InventoryLog log : logs) {
            InventoryLogDto logDto = convertToInventoryLogDto(log);
            logDtos.add(logDto);
        }

        return logDtos;
    }

    public InventoryLogDto getLogById(int id) {
        InventoryLog log = inventoryLogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Log with ID " + id + " not found"));

        return convertToInventoryLogDto(log);
    }

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
