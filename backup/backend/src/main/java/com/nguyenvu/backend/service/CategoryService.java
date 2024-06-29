package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Category;

import java.util.List;


public interface CategoryService {
    Category createCategory(Category category);
    Category getCategoryById(Long categoryId);
    List<Category> getAllCategories();
    Category updateCategory(Category category);
    void deleteCategory(Long categoryId);

}