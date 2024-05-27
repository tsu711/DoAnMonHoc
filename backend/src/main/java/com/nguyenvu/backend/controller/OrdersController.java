package com.nguyenvu.backend.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyenvu.backend.entity.Orders;
import com.nguyenvu.backend.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/orders")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")
public class OrdersController{
    
    private OrderService ordersService;
    // Create Orders REST API

@PostMapping

public ResponseEntity<Orders> createOrders(@RequestBody Orders Orders) {
Orders savedOrders = ordersService.createOrders(Orders);
return new ResponseEntity<>(savedOrders, HttpStatus.CREATED);


}
// Get Orders by id REST API

// http://1ocalhost:8080/api/Orderss/1

@GetMapping("{id}")

public ResponseEntity<Orders> getOrdersById(@PathVariable("id") Long OrdersId) {
Orders Orders = ordersService.getOrdersById(OrdersId);
return new ResponseEntity<>(Orders, HttpStatus.OK);
}
// Get All Orderss REST API

// http://localhost:8080/api/Orderss

@GetMapping

public ResponseEntity<List<Orders>> getAllOrders() {
List<Orders> Orderss = ordersService.getAllOrders();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Orderss.size()+"/"+Orderss.size());
return ResponseEntity.ok().headers(headers).body(Orderss);




}
// Update Orders REST API
@PutMapping("{id}")
// http://localhost:8080/api/Orderss/1
public ResponseEntity<Orders> updateOrders(@PathVariable("id") Long OrdersId,
@RequestBody Orders Orders) {
Orders.setId(OrdersId);
Orders updatedOrders = ordersService.updateOrders(Orders);
return new ResponseEntity<>(updatedOrders, HttpStatus.OK);
}
// Delete Orders REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteOrders(@PathVariable("id") Long OrdersId) {
ordersService.deleteOrders(OrdersId);
return new ResponseEntity<>("Orders successfully deleted!", HttpStatus.OK);
}

}