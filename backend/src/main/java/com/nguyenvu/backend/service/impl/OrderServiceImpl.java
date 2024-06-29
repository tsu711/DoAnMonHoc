package com.nguyenvu.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.nguyenvu.backend.entity.Cart;
import com.nguyenvu.backend.entity.Order;
import com.nguyenvu.backend.entity.OrderDetail;
import com.nguyenvu.backend.entity.Product;
import com.nguyenvu.backend.repository.CartRepository;
import com.nguyenvu.backend.repository.ColorRepository;
import com.nguyenvu.backend.repository.OrderDetailRepository;
import com.nguyenvu.backend.repository.OrderRepository;
import com.nguyenvu.backend.repository.ProductRepository;
import com.nguyenvu.backend.repository.SizeRepository;
import com.nguyenvu.backend.service.OrderService;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        // Tạo đối tượng Order mới và sao chép thuộc tính từ đối tượng nhận được
        Order newOrder = new Order();
        newOrder.setTotalMoney(order.getTotalMoney());
        newOrder.setThumbnail(order.getThumbnail());
        newOrder.setFullname(order.getFullname());
        newOrder.setPhoneNumber(order.getPhoneNumber());
        newOrder.setEmail(order.getEmail());
        newOrder.setPaymentMethod(order.getPaymentMethod());
        newOrder.setAddress(order.getAddress());
        newOrder.setOrderDate(order.getOrderDate());
        newOrder.setUserId(order.getUserId());
    
        // Xác định trạng thái dựa trên phương thức thanh toán
        String paymentMethod = order.getPaymentMethod();
        String status = paymentMethod != null && paymentMethod.equals("shipcod") ? "Chưa thanh toán" : "Đã thanh toán";
        newOrder.setStatus(status);
        newOrder.setPaymentMethod(paymentMethod);
    
        // Lưu đơn hàng mới và lấy ra đối tượng đã lưu
        Order savedOrder = orderRepository.save(newOrder);
    
        // Lưu chi tiết đơn hàng nếu có
        if (order.getOrderDetails() != null) {
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = productRepository.findById(orderDetail.getProduct().getId()).orElse(null);
                if (product != null) {
                    OrderDetail newOrderDetail = new OrderDetail();
                    newOrderDetail.setOrder(savedOrder);
                    newOrderDetail.setProduct(product);
                    // Uncomment these lines if you have color and size repositories and entities
                    newOrderDetail.setColor(colorRepository.findByName(orderDetail.getColor().getName()).orElse(null));
                    newOrderDetail.setSize(sizeRepository.findByName(orderDetail.getSize().getName()).orElse(null));
                    newOrderDetail.setPriceOrder(orderDetail.getPriceOrder());
                    newOrderDetail.setQuantity(orderDetail.getQuantity());
                    orderDetailRepository.save(newOrderDetail);
                }
            }
        }
    
        // Xóa các mục giỏ hàng liên quan đến đơn hàng và thêm vào listIdCart
        List<Long> cartIds = new ArrayList<>();
        for (Long cartId : order.getListIdCart()) {
            cartRepository.findById(cartId).ifPresent(cart -> {
                cartIds.add(cart.getId());
                cartRepository.delete(cart);
            });
        }
        savedOrder.setListIdCart(cartIds);
    
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @Override
    public List<Order> getOrderByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    // get by id
    @Override
    public Order getOrderById(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        return optionalOrder.orElse(null);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Order updateOrder(Long orderId, Order updatedOrder) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order existingOrder = optionalOrder.get();
            existingOrder.setFullname(updatedOrder.getFullname());
            existingOrder.setEmail(updatedOrder.getEmail());
            existingOrder.setPhoneNumber(updatedOrder.getPhoneNumber());
            existingOrder.setThumbnail(updatedOrder.getThumbnail());
            existingOrder.setAddress(updatedOrder.getAddress());
            existingOrder.setOrderDate(updatedOrder.getOrderDate());
            existingOrder.setStatus(updatedOrder.getStatus());
            existingOrder.setTotalMoney(updatedOrder.getTotalMoney());
            existingOrder.setUserId(updatedOrder.getUserId());
            existingOrder.setPaymentMethod(updatedOrder.getPaymentMethod());
            return orderRepository.save(existingOrder);
        }
        return null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
