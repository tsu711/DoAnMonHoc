package com.nguyenvu.backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Order;




public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(String userId);
    
}
