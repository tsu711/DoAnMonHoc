package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Orders;




public interface OrderRepository extends JpaRepository<Orders, Long> {
    
}
