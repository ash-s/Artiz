package com.kura.repository;

import com.kura.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySlug(String slug);
    List<Product> findByRoomTypeIgnoreCase(String roomType);
    List<Product> findByIsFeaturedTrue();
    List<Product> findByCategoryId(Long categoryId);
}
