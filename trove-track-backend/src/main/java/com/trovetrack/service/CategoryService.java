package com.trovetrack.service;

import com.trovetrack.dto.CategoryDto;
import com.trovetrack.dto.ItemDto;
import com.trovetrack.entity.Category;
import com.trovetrack.entity.Item;
import com.trovetrack.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service // Tells Spring to manage this class, contains business logic, allows for dependency injection
@RequiredArgsConstructor // lombok annotation that allows constructor-based dependency injection
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category newCategory = convertToCategoryEntity(categoryDto);
        newCategory.setDateCreated(LocalDateTime.now());
        Category savedCategory = categoryRepository.save(newCategory);

        return convertToCategoryDto(savedCategory);
    }

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtos = new ArrayList<>();

        for (Category category : categories) {
            CategoryDto categoryDto = convertToCategoryDto(category);
            categoryDtos.add(categoryDto);
        }

        return categoryDtos;
    }

    public CategoryDto getCategoryById(int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category with ID " + id + " not found"));
        return convertToCategoryDto(category);
    }

    public CategoryDto updateCategory(int id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category with ID " + id + " not found"));

        category.setName(categoryDto.getName());
        category.setDateCreated(LocalDateTime.now());
        Category updatedCategory = categoryRepository.save(category);

        return convertToCategoryDto(updatedCategory);
    }

    public void deleteCategory(int id) {
        if(!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found with ID: " + id);
        }
        categoryRepository.deleteById(id);
    }

    private CategoryDto convertToCategoryDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setDateCreated(category.getDateCreated());

        // Convert each Item to ItemDTO and add to the list
        List<ItemDto> itemDTOs = new ArrayList<>();
        for (Item item : category.getItems()) {
            ItemDto itemDTO = convertToItemDto(item);
            itemDTOs.add(itemDTO);
        }
        categoryDto.setItems(itemDTOs);

        return categoryDto;
    }

    private Category convertToCategoryEntity(CategoryDto categoryDto) {
        Category category = new Category();
        category.setId(categoryDto.getId());
        category.setName(categoryDto.getName());

        return category;
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
}
