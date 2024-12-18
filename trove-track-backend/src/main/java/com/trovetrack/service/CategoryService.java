package com.trovetrack.service;

import com.trovetrack.entity.Category;
import com.trovetrack.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        category.setDateCreated(LocalDateTime.now());
        return categoryRepository.save(category);
    }
}
