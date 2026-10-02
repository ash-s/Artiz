package com.kura.controller;

import com.kura.model.Product;
import com.kura.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) String room,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Long categoryId
    ) {
        if (room != null && !room.isBlank()) {
            return productRepository.findByRoomTypeIgnoreCase(room);
        }
        if (Boolean.TRUE.equals(featured)) {
            return productRepository.findByIsFeaturedTrue();
        }
        if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId);
        }
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Product> getProductBySlug(@PathVariable String slug) {
        return productRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/room/{roomType}")
    public List<Product> getProductsByRoom(@PathVariable String roomType) {
        return productRepository.findByRoomTypeIgnoreCase(roomType);
    }
}
