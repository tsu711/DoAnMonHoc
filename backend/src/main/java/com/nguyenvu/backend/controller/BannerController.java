package com.nguyenvu.backend.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.nguyenvu.backend.entity.Banner;

import com.nguyenvu.backend.service.BannerService;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/banners")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")

public class BannerController{
    private BannerService BannerService;
    // Create Banner REST API

@PostMapping

public ResponseEntity<Banner> createBanner(@RequestBody Banner Banner) {
Banner savedBanner = BannerService.createBanner(Banner);
return new ResponseEntity<>(savedBanner, HttpStatus.CREATED);


}
// Get Banner by id REST API

// http://1ocalhost:8080/api/Banners/1

@GetMapping("{id}")

public ResponseEntity<Banner> getBannerById(@PathVariable("id") Long BannerId) {
Banner Banner = BannerService.getBannerById(BannerId);
return new ResponseEntity<>(Banner, HttpStatus.OK);
}
// Get All Banners REST API

// http://localhost:8080/api/Banners

@GetMapping

public ResponseEntity<List<Banner>> getAllBanners() {
List<Banner> Banners = BannerService.getAllBanners();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Banners.size()+"/"+Banners.size());
return ResponseEntity.ok().headers(headers).body(Banners);


}
// Update Banner REST API
@PutMapping("{id}")
// http://localhost:8080/api/Banners/1
public ResponseEntity<Banner> updateBanner(@PathVariable("id") Long BannerId,
@RequestBody Banner Banner) {
Banner.setId(BannerId);
Banner updatedBanner = BannerService.updateBanner(Banner);
return new ResponseEntity<>(updatedBanner, HttpStatus.OK);
}
// Delete Banner REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteBanner(@PathVariable("id") Long BannerId) {
BannerService.deleteBanner(BannerId);
return new ResponseEntity<>("Banner successfully deleted!", HttpStatus.OK);
}
}