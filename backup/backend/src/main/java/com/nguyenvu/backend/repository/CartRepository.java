package com.nguyenvu.backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.nguyenvu.backend.entity.Cart;




public interface CartRepository extends JpaRepository<Cart, Long> {
     Optional<Cart> findById(Long id);

    List<Cart> findAllByUserId(String userId);
    List<Cart> findAllByProductIdAndUserIdAndColorIdAndSizeId(Long productId, String userId, Long colorId, Long sizeId);
    List<Cart> findByUserIdAndProductId(String userId, Long productId);
}
