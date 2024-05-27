package com.nguyenvu.backend.service;
import com.nguyenvu.backend.entity.Product;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface ProductService {
public Product createProduct(Product Product);
public Product getProductById(Long ProductId);
public Page<Product> getAllProducts(Pageable pageable);
public Product updateProduct(Product Product);
public void deleteProduct(Long ProductId);
// public List<Product> getProductsByCondition(String title, Long category);
public List<Product> getLatestProductsInCategory(Long categoryId, int pageSize);
public Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable);
}