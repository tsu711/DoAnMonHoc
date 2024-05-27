package com.nguyenvu.backend.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import com.nguyenvu.backend.entity.OrderDetail;
import com.nguyenvu.backend.service.OrderDetailService;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/orderDetails")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")

public class OrderDetailController{
    private OrderDetailService OrderDetailService;
    // Create OrderDetail REST API

@PostMapping

public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetail OrderDetail) {
OrderDetail savedOrderDetail = OrderDetailService.createOrderDetail(OrderDetail);
return new ResponseEntity<>(savedOrderDetail, HttpStatus.CREATED);


}
// Get OrderDetail by id REST API

// http://1ocalhost:8080/api/OrderDetails/1

@GetMapping("{id}")

public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable("id") Long OrderDetailId) {
OrderDetail OrderDetail = OrderDetailService.getOrderDetailById(OrderDetailId);
return new ResponseEntity<>(OrderDetail, HttpStatus.OK);
}
// Get All OrderDetails REST API

// http://localhost:8080/api/OrderDetails

@GetMapping

public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
List<OrderDetail> OrderDetails = OrderDetailService.getAllOrderDetails();

HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ OrderDetails.size()+"/"+OrderDetails.size());
return ResponseEntity.ok().headers(headers).body(OrderDetails);

}
// Update OrderDetail REST API
@PutMapping("{id}")
// http://localhost:8080/api/OrderDetails/1
public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable("id") Long OrderDetailId,
@RequestBody OrderDetail OrderDetail) {
OrderDetail.setId(OrderDetailId);
OrderDetail updatedOrderDetail = OrderDetailService.updateOrderDetail(OrderDetail);
return new ResponseEntity<>(updatedOrderDetail, HttpStatus.OK);
}
// Delete OrderDetail REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteOrderDetail(@PathVariable("id") Long OrderDetailId) {
OrderDetailService.deleteOrderDetail(OrderDetailId);
return new ResponseEntity<>("OrderDetail successfully deleted!", HttpStatus.OK);
}
}