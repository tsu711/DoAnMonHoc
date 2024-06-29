package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.OrderDetail;

import java.util.List;
 

public interface OrderDetailService {
    OrderDetail addOrderDetail(OrderDetail orderDetail);

    OrderDetail getOrderDetailById(Long orderDetailId);

    List<OrderDetail> getAllOrderDetails();

    OrderDetail updateOrderDetail(Long orderDetailId, OrderDetail updatedOrderDetail);

    void deleteOrderDetail(Long orderDetailId);

    List<OrderDetail> getOrderDetailsByOrderId(Long orderId);
}