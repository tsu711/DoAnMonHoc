
package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service; 
import com.nguyenvu.backend.entity.Category;
import com.nguyenvu.backend.repository.CategoryRepository;
import com.nguyenvu.backend.service.CategoryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository CategoryRepository;

    @Override
    public Category createCategory(Category Category) {
        return CategoryRepository.save(Category);
    }

    @Override
    public Category getCategoryById(Long CategoryId){
        Optional<Category> optionalCategory = CategoryRepository.findById(CategoryId);
        return optionalCategory.get();
    }

     @Override
    public List<Category> getAllCategories() {
        return CategoryRepository.findAll();
    }

    @Override
public Category updateCategory(Category category) {
Category existingCategory = CategoryRepository.findById(category.getId()).get();
existingCategory.setName(category.getName());
existingCategory.setIsHome(category.getIsHome());
Category updatedCategory = CategoryRepository.save(existingCategory);
return updatedCategory;
}

    @Override
    public void deleteCategory(Long categoryId){
        CategoryRepository.deleteById(categoryId);
    }

}
