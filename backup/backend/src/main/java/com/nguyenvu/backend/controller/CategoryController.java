package com.nguyenvu.backend.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.nguyenvu.backend.entity.Category;    
import org.springframework.http.HttpHeaders;

import com.nguyenvu.backend.service.CategoryService;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")
public class CategoryController{
    private CategoryService CategoryService;
    // Create Category REST API

@PostMapping

public ResponseEntity<Category> createCategory(@RequestBody Category Category) {
Category savedCategory = CategoryService.createCategory(Category);
return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);


}
// Get Category by id REST API

// http://1ocalhost:8080/api/Categories/1

@GetMapping("{id}")

public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long CategoryId) {
Category Category = CategoryService.getCategoryById(CategoryId);
return new ResponseEntity<>(Category, HttpStatus.OK);
}
// Get All Categories REST API

// http://localhost:8080/api/Categories

@GetMapping

public ResponseEntity<List<Category>> getAllCategories() {
List<Category> Categories = CategoryService.getAllCategories();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Categories.size()+"/"+Categories.size());
return ResponseEntity.ok().headers(headers).body(Categories);


}
// Update Category REST API
@PutMapping("{id}")
// http://localhost:8080/api/Categories/1
public ResponseEntity<Category> updateCategory(@PathVariable("id") Long CategoryId,
@RequestBody Category Category) {
Category.setId(CategoryId);
Category updatedCategory = CategoryService.updateCategory(Category);
return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
}
// Delete Category REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteCategory(@PathVariable("id") Long CategoryId) {
CategoryService.deleteCategory(CategoryId);
return new ResponseEntity<>("Category successfully deleted!", HttpStatus.OK);
}
}