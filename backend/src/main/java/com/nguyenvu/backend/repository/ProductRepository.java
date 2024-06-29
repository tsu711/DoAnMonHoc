package com.nguyenvu.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nguyenvu.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByTitleAndCategoryId(String title, Long category);

    List<Product> findByTitle(String title);

    List<Product> findByCategoryId(Long category);

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId ORDER BY p.created_at DESC")
    List<Product> findLatestProductsInCategory(Long categoryId, Pageable pageable);

    Page<Product> findProductsByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice ORDER BY p.price ASC")
    Page<Product> findProductsByPriceAsc(int minPrice, int maxPrice, Pageable pageable);

    // Query to find products by price range with descending sorting and pagination
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice ORDER BY p.price DESC")
    Page<Product> findProductsByPriceDesc(int minPrice, int maxPrice, Pageable pageable);

    // Query to find products by price range without sorting and with pagination
    Page<Product> findByPriceBetween(int minPrice, int maxPrice, Pageable pageable);

    //     @Query("SELECT p FROM Product p WHERE LOWER(p.title) LIKE %:title%")
    // List<Product> searchByTitle(@Param("title") String title);

    List<Product> findByTitleContainingIgnoreCase(String title);

    List<Product> findAll();
}
