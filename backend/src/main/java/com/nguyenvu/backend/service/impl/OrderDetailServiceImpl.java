




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.OrderDetail;
import com.nguyenvu.backend.repository.OrderDetailRepository;
import com.nguyenvu.backend.service.OrderDetailService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class OrderDetailServiceImpl implements OrderDetailService {
    private OrderDetailRepository galleryRepository;

    @Override
    public OrderDetail createOrderDetail(OrderDetail gallery) {
        return galleryRepository.save(gallery);
    }

    @Override
    public OrderDetail getOrderDetailById(Long galleryId){
        Optional<OrderDetail> optionalOrderDetail = galleryRepository.findById(galleryId);
        return optionalOrderDetail.get();
    }

     @Override
    public List<OrderDetail> getAllOrderDetails() {
        return galleryRepository.findAll();
    }
@Override
      public OrderDetail updateOrderDetail(OrderDetail OrderDetail){
        OrderDetail existingOrderDetail = galleryRepository.findById(OrderDetail.getId()).get();
        existingOrderDetail.setPrice(OrderDetail.getPrice());
         existingOrderDetail.setNum(OrderDetail.getNum());
         existingOrderDetail.setTotal_money(OrderDetail.getTotal_money());
         existingOrderDetail.setProduct(OrderDetail.getProduct());
         existingOrderDetail.setOrder(OrderDetail.getOrder());
        
        OrderDetail updateOrderDetail = galleryRepository.save(existingOrderDetail);
        return updateOrderDetail;
    }

    @Override
    public void deleteOrderDetail(Long galleryId){
        galleryRepository.deleteById(galleryId);
    }

}
