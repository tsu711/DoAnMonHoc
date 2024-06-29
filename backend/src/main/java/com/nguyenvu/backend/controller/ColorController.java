package com.nguyenvu.backend.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.nguyenvu.backend.entity.Color;

import com.nguyenvu.backend.service.ColorService;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/colors")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")

public class ColorController{
    private ColorService ColorService;
    // Create Color REST API

@PostMapping

public ResponseEntity<Color> createColor(@RequestBody Color Color) {
Color savedColor = ColorService.createColor(Color);
return new ResponseEntity<>(savedColor, HttpStatus.CREATED);


}
// Get Color by id REST API

// http://1ocalhost:8080/api/Colors/1

@GetMapping("{id}")

public ResponseEntity<Color> getColorById(@PathVariable("id") Long ColorId) {
Color Color = ColorService.getColorById(ColorId);
return new ResponseEntity<>(Color, HttpStatus.OK);
}
// Get All Colors REST API

// http://localhost:8080/api/Colors

@GetMapping

public ResponseEntity<List<Color>> getAllColors() {
List<Color> Colors = ColorService.getAllColors();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Colors.size()+"/"+Colors.size());
return ResponseEntity.ok().headers(headers).body(Colors);


}
// Update Color REST API
@PutMapping("{id}")
// http://localhost:8080/api/Colors/1
public ResponseEntity<Color> updateColor(@PathVariable("id") Long ColorId,
@RequestBody Color Color) {
Color.setId(ColorId);
Color updatedColor = ColorService.updateColor(Color);
return new ResponseEntity<>(updatedColor, HttpStatus.OK);
}
// Delete Color REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteColor(@PathVariable("id") Long ColorId) {
ColorService.deleteColor(ColorId);
return new ResponseEntity<>("Color successfully deleted!", HttpStatus.OK);
}
}