package com.nguyenvu.backend.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.nguyenvu.backend.entity.Size;

import com.nguyenvu.backend.service.SizeService;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/sizes")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")

public class SizeController{
    private SizeService SizeService;
    // Create Size REST API

@PostMapping

public ResponseEntity<Size> createSize(@RequestBody Size Size) {
Size savedSize = SizeService.createSize(Size);
return new ResponseEntity<>(savedSize, HttpStatus.CREATED);


}
// Get Size by id REST API

// http://1ocalhost:8080/api/Sizes/1

@GetMapping("{id}")

public ResponseEntity<Size> getSizeById(@PathVariable("id") Long SizeId) {
Size Size = SizeService.getSizeById(SizeId);
return new ResponseEntity<>(Size, HttpStatus.OK);
}
// Get All Sizes REST API

// http://localhost:8080/api/Sizes

@GetMapping

public ResponseEntity<List<Size>> getAllSizes() {
List<Size> Sizes = SizeService.getAllSizes();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Sizes.size()+"/"+Sizes.size());
return ResponseEntity.ok().headers(headers).body(Sizes);


}
// Update Size REST API
@PutMapping("{id}")
// http://localhost:8080/api/Sizes/1
public ResponseEntity<Size> updateSize(@PathVariable("id") Long SizeId,
@RequestBody Size Size) {
Size.setId(SizeId);
Size updatedSize = SizeService.updateSize(Size);
return new ResponseEntity<>(updatedSize, HttpStatus.OK);
}
// Delete Size REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteSize(@PathVariable("id") Long SizeId) {
SizeService.deleteSize(SizeId);
return new ResponseEntity<>("Size successfully deleted!", HttpStatus.OK);
}
}