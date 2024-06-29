package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Order;


import java.util.List;


import org.springframework.http.ResponseEntity;


public interface OrderService {
    // Order createOrder(Order order);
    
    List<Order> getOrderByUserId(String userId); 
     ResponseEntity<?> addOrder(Order order);
    Order getOrderById(Long orderId);
    List<Order> getAllOrders();
    Order updateOrder(Long orderId, Order updatedOrder);
    void deleteOrder(Long orderId);

}  