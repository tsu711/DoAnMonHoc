package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.OrderDetail;

import java.util.List;


public interface OrderDetailService {
    OrderDetail createOrderDetail(OrderDetail orderDetail);
    OrderDetail getOrderDetailById(Long orderDetailId);
    List<OrderDetail> getAllOrderDetails();
    OrderDetail updateOrderDetail(OrderDetail orderDetail);
    void deleteOrderDetail(Long orderDetailId);

}