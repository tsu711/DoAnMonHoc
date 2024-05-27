




package com.nguyenvu.backend.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Orders;
import com.nguyenvu.backend.repository.OrderRepository;
import com.nguyenvu.backend.service.OrderService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class OrdersServiceImpl implements OrderService {

    private OrderRepository galleryRepository;





    @Override
    public Orders createOrders(Orders gallery) {
        return galleryRepository.save(gallery);
    }

    @Override
    public Orders getOrdersById(Long galleryId){
        Optional<Orders> optionalOrders = galleryRepository.findById(galleryId);
        return optionalOrders.get();
    }

     @Override
    public List<Orders> getAllOrders() {
        return galleryRepository.findAll();
    }
@Override
      public Orders updateOrders(Orders Orders){
        Orders existingOrders = galleryRepository.findById(Orders.getId()).get();
        existingOrders.setImage(Orders.getImage());
        existingOrders.setFullname(Orders.getFullname());
         existingOrders.setEmail(Orders.getEmail());
         existingOrders.setThumbnail(Orders.getThumbnail());
         existingOrders.setPhone_number(Orders.getPhone_number());
         existingOrders.setOrder_date(Orders.getOrder_date());
         existingOrders.setStatus(Orders.getStatus());
        existingOrders.setTotal_money(Orders.getTotal_money());
        existingOrders.setUser(Orders.getUser());
        existingOrders.setOrderdetail(Orders.getOrderdetail());
        Orders updateOrders = galleryRepository.save(existingOrders);
        return updateOrders;
      }

    @Override
    public void deleteOrders(Long galleryId){
        galleryRepository.deleteById(galleryId);
    }



  

}
