package com.nguyenvu.backend.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.nguyenvu.backend.entity.Menu;

import com.nguyenvu.backend.service.MenuService;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/menus")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")

public class MenuController{
    private MenuService MenuService;
    // Create Menu REST API

@PostMapping

public ResponseEntity<Menu> createMenu(@RequestBody Menu Menu) {
Menu savedMenu = MenuService.createMenu(Menu);
return new ResponseEntity<>(savedMenu, HttpStatus.CREATED);


}
// Get Menu by id REST API

// http://1ocalhost:8080/api/Menus/1

@GetMapping("{id}")

public ResponseEntity<Menu> getMenuById(@PathVariable("id") Long MenuId) {
Menu Menu = MenuService.getMenuById(MenuId);
return new ResponseEntity<>(Menu, HttpStatus.OK);
}
// Get All Menus REST API

// http://localhost:8080/api/Menus

@GetMapping

public ResponseEntity<List<Menu>> getAllMenus() {
List<Menu> Menus = MenuService.getAllMenus();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Menus.size()+"/"+Menus.size());
return ResponseEntity.ok().headers(headers).body(Menus);


}
// Update Menu REST API
@PutMapping("{id}")
// http://localhost:8080/api/Menus/1
public ResponseEntity<Menu> updateMenu(@PathVariable("id") Long MenuId,
@RequestBody Menu Menu) {
Menu.setId(MenuId);
Menu updatedMenu = MenuService.updateMenu(Menu);
return new ResponseEntity<>(updatedMenu, HttpStatus.OK);
}
// Delete Menu REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteMenu(@PathVariable("id") Long MenuId) {
MenuService.deleteMenu(MenuId);
return new ResponseEntity<>("Menu successfully deleted!", HttpStatus.OK);
}
}