package com.trovetrack.controller;

import com.trovetrack.entity.Category;
import com.trovetrack.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // lombok annotation that allows constructor-based dependency injection
@CrossOrigin(origins = "http://localhost:5173/")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/category")
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }
}
