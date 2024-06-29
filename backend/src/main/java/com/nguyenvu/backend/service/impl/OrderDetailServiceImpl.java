




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.nguyenvu.backend.entity.Color;
import com.nguyenvu.backend.entity.OrderDetail;
import com.nguyenvu.backend.entity.Product;
import com.nguyenvu.backend.repository.OrderDetailRepository;
import com.nguyenvu.backend.service.OrderDetailService;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    // get by id
    @Override
    public OrderDetail getOrderDetailById(Long orderDetailId) {
        Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(orderDetailId);
        return optionalOrderDetail.orElse(null);
    }

    // get order by id
    @Override
    public List<OrderDetail> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }

    // get all
    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail addOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail updateOrderDetail(Long orderDetailId, OrderDetail updatedOrderDetail) {
        OrderDetail existingOrderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);

        if (existingOrderDetail != null) {
            existingOrderDetail.setProduct(updatedOrderDetail.getProduct());
            existingOrderDetail.setOrder(updatedOrderDetail.getOrder());
            existingOrderDetail.setPriceOrder(updatedOrderDetail.getPriceOrder());
            existingOrderDetail.setColor(updatedOrderDetail.getColor());
            existingOrderDetail.setSize(updatedOrderDetail.getSize());
            existingOrderDetail.setQuantity(updatedOrderDetail.getQuantity());
            return orderDetailRepository.save(existingOrderDetail);
        }
        return null;
    }

    @Override
    public void deleteOrderDetail(Long orderDetailId) {
        orderDetailRepository.deleteById(orderDetailId);
    }
}
