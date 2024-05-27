package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.OrderDetail;




public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    
}
