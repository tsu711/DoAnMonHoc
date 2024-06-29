package com.nguyenvu.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import com.nguyenvu.backend.entity.Cart;
import com.nguyenvu.backend.entity.Color;
import com.nguyenvu.backend.entity.Order;
import com.nguyenvu.backend.entity.OrderDetail;
import com.nguyenvu.backend.entity.Product;
import com.nguyenvu.backend.entity.Size;
import com.nguyenvu.backend.service.OrderService;

@RestController
@RequestMapping("api/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, exposedHeaders = "Content-Range")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Create Order REST API
    @PostMapping
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        return orderService.addOrder(order);
    }

    // Get Order by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long orderId) {
        Order order = orderService.getOrderById(orderId);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get All Order REST API
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrder() {
        List<Order> orders = orderService.getAllOrders();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "items 0-" + orders.size() + "/" + orders.size());
        return ResponseEntity.ok().headers(headers).body(orders);
    }

    // Update Order REST API
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable("id") Long orderId, @RequestBody Order updatedOrder) {
        Order order = orderService.updateOrder(orderId, updatedOrder);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Order REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    // Get Orders by User Id REST API
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<Order>> getOrderByUserId(@PathVariable("userId") String userId) {
        List<Order> orders = orderService.getOrderByUserId(userId);
        List<Order> ordersWithDetails = new ArrayList<>();
        for (Order order : orders) { 
            Order orderWithDetails = new Order();
            orderWithDetails.setId(order.getId());
            orderWithDetails.setTotalMoney(order.getTotalMoney());
            orderWithDetails.setFullname(order.getFullname());
            orderWithDetails.setAddress(order.getAddress());
            orderWithDetails.setEmail(order.getEmail());
            orderWithDetails.setPhoneNumber(order.getPhoneNumber());
            orderWithDetails.setOrderDate(order.getOrderDate());
            orderWithDetails.setStatus(order.getStatus());
            orderWithDetails.setUserId(order.getUserId());

            List<OrderDetail> orderDetails = new ArrayList<>();
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                OrderDetail detail = new OrderDetail();
                detail.setId(orderDetail.getId());
                detail.setProduct(orderDetail.getProduct());
                // detail.setColor(orderDetail.getColor());
                // detail.setSize(orderDetail.getSize());
                detail.setPriceOrder(orderDetail.getPriceOrder());
                detail.setQuantity(orderDetail.getQuantity());
                orderDetails.add(detail);
            }
            orderWithDetails.setOrderDetails(orderDetails);

            List<Long> listIdCart = new ArrayList<>();
            for (Cart cart : order.getCart()) {
                listIdCart.add(cart.getId());
            }
            orderWithDetails.setListIdCart(listIdCart);

            ordersWithDetails.add(orderWithDetails);
        }
        return ResponseEntity.ok(ordersWithDetails);
    }

    @ControllerAdvice
    public class GlobalExceptionHandler {

        @ExceptionHandler(Exception.class)
        public ResponseEntity<?> globalExceptionHandler(Exception ex, WebRequest request) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
