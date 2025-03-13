package com.trovetrack.service;

import com.trovetrack.dto.AmazonProductDto;
import com.trovetrack.dto.ItemDto;
import com.trovetrack.entity.Category;
import com.trovetrack.entity.Item;
import com.trovetrack.repository.CategoryRepository;
import com.trovetrack.repository.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service // Tells Spring to manage this class, contains business logic, allows for dependency injection
@RequiredArgsConstructor // Lombok annotation that allows constructor-based dependency injection
public class ItemService {

    private final ItemRepository itemRepository;

    private final CategoryRepository categoryRepository;

    private final AmazonApiService amazonApiService;

    public ItemDto createItem(ItemDto itemDto) {
        // If ASIN is provided, get product details from Amazon
        if (itemDto.getAsin() != null && !itemDto.getAsin().isEmpty()) {
            AmazonProductDto product = amazonApiService.getAmazonProduct(itemDto.getAsin());

            if (product != null) {
                itemDto.setDescription(product.getProductTitle());
                itemDto.setPrice(product.getProductPrice());
            }
        }

        Item newItem = convertToItemEntity(itemDto);
        Item savedItem = itemRepository.save(newItem);

        return convertToItemDto(savedItem);
    }

    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepository.findAll();
        List<ItemDto> itemDtos = new ArrayList<>();

        for (Item item : items) {
            ItemDto itemDto = convertToItemDto(item);
            itemDtos.add(itemDto);
        }

        return itemDtos;
    }

    public ItemDto getItemById(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item with ID " + id + " not found"));

        return convertToItemDto(item);
    }

    public ItemDto updateItem(int id, ItemDto itemDto) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item with ID " + id + " not found"));

        // Only updates fields if they are provided in the request
        if (itemDto.getName() != null) {
            item.setName(itemDto.getName());
        }
        if (itemDto.getQuantity() != null) {
            item.setQuantity(itemDto.getQuantity());
        }
        if (itemDto.getMinQuantity() != null) {
            item.setMinQuantity(itemDto.getMinQuantity());
        }
        if (itemDto.getPrice() != null) {
            item.setPrice(itemDto.getPrice());
        }
        if (itemDto.getLocation() != null) {
            item.setLocation(itemDto.getLocation());
        }
        if (itemDto.getDescription() != null) {
            item.setDescription(itemDto.getDescription());
        }
        if (itemDto.getCategoryId() != null) {
            int categoryId = itemDto.getCategoryId();
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new EntityNotFoundException("Category with ID " + categoryId + " not found"));
            item.setCategory(category);
        }
        if (itemDto.getAsin() != null && !itemDto.getAsin().isEmpty()) {
            AmazonProductDto product = amazonApiService.getAmazonProduct(itemDto.getAsin());
            if (product != null) {
                item.setDescription(product.getProductTitle());
                item.setPrice(product.getProductPrice());
            }
            item.setAsin(itemDto.getAsin());
        }
        Item updatedItem = itemRepository.save(item);

        return convertToItemDto(updatedItem);
    }

    public void deleteItem(int id) {
        if(!itemRepository.existsById(id)) {
            throw new EntityNotFoundException("Item with ID " + id + " not found");
        }
        try {
            itemRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Cannot delete item with ID " + id + " due to foreign key constraints");
        }
    }

    private ItemDto convertToItemDto(Item item) {
        ItemDto itemDto = new ItemDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setDescription(item.getDescription());
        itemDto.setLocation(item.getLocation());
        itemDto.setQuantity(item.getQuantity());
        itemDto.setPrice(item.getPrice());
        itemDto.setMinQuantity(item.getMinQuantity());
        itemDto.setCategoryId(item.getCategory().getId());
        itemDto.setAsin(item.getAsin());

        return itemDto;
    }

    private Item convertToItemEntity(ItemDto itemDto) {
        Item item = new Item();
        item.setId(itemDto.getId());
        item.setName(itemDto.getName());
        item.setDescription(itemDto.getDescription());
        item.setLocation(itemDto.getLocation());
        item.setQuantity(itemDto.getQuantity() != null ? itemDto.getQuantity() : 0);
        item.setPrice(itemDto.getPrice() != null ? itemDto.getPrice() : 0.00);
        item.setMinQuantity(itemDto.getMinQuantity() != null ? itemDto.getMinQuantity() : 1);
        item.setAsin(itemDto.getAsin());

        Category category = categoryRepository.findById(itemDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category with ID " + itemDto.getCategoryId() + " not found"));
        item.setCategory(category);

        return item;
    }
}
