package com.trovetrack.controller;

import com.trovetrack.service.CategoryService;
import com.trovetrack.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // Lombok annotation that allows constructor-based dependency injection
@CrossOrigin(origins = "http://localhost:5173/")
public class ItemController {

    private final ItemService itemService;

    private final CategoryService categoryService;

//    @PostMapping("/items")
//    public ResponseEntity<ItemDto> createItem(@RequestBody ItemDto itemDto) {
//
//    }
}
