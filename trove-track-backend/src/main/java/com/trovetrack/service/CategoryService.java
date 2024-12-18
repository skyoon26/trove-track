package com.trovetrack.service;

import com.trovetrack.entity.Category;
import com.trovetrack.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service // Tells Spring to manage this class, contains business logic, allows for dependency injection
@RequiredArgsConstructor // lombok annotation that allows constructor-based dependency injection
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        category.setDateCreated(LocalDateTime.now());
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + id));
    }

    public Category updateCategory(int id, Category category) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + id));

        existingCategory.setName(category.getName());
        existingCategory.setDateCreated(LocalDateTime.now());

        return categoryRepository.save(existingCategory);
    }

}
