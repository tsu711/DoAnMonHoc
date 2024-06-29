package com.nguyenvu.backend.service;

import com.nguyenvu.backend.DTO.CartDTO;
import com.nguyenvu.backend.entity.Cart;
import com.nguyenvu.backend.entity.Product;

import java.util.List;


public interface CartService { 
   // dinh nghia cac ham
   void updateQuantity(String UserId, Long productId, Integer newQuantity);
   Cart addCart(Cart cart);
   List<Cart> getAllCart();
   List<CartDTO> getAllCartsByUserId(String userId);
   Cart updateCart(Long cartId, Cart updatedCart);

    Cart getCartById(Long cartId);
 

    List<CartDTO> getAllProductsInCartByUserId(String userId);
    void deleteCart(Long cartId);

}