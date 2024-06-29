package com.nguyenvu.backend.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Order;
import com.nguyenvu.backend.entity.OrderDetail;




public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrder(Order order);
    List<OrderDetail> findByOrderId(Long orderId);
}
