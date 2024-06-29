package com.nguyenvu.backend.service.impl;

import com.nguyenvu.backend.DTO.CartDTO;
import com.nguyenvu.backend.entity.Cart;
import com.nguyenvu.backend.entity.Color;
import com.nguyenvu.backend.entity.Size;
import com.nguyenvu.backend.repository.CartRepository;
import com.nguyenvu.backend.repository.ColorRepository;
import com.nguyenvu.backend.repository.SizeRepository;
import com.nguyenvu.backend.service.CartService;
import com.nguyenvu.backend.service.ProductService;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    
    private final ProductService productService;

    @Override
    public Cart getCartById(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        return optionalCart.orElse(null);
    }

    @Override
    public List<Cart> getAllCart() {
        return cartRepository.findAll();
    }

    @Override
    public Cart updateCart(Long cartId, Cart updatedCart) {
        Cart existingCart = cartRepository.findById(updatedCart.getId()).orElse(null);
        existingCart.setColor(updatedCart.getColor());
        existingCart.setSize(updatedCart.getSize());
        existingCart.setProductId(updatedCart.getProductId());
        
     
        existingCart.setQuantity(updatedCart.getQuantity());
       existingCart.setTotalMoney(updatedCart.getTotalMoney());
       existingCart.setPrice(updatedCart.getPrice());
        
        return null;
    }

    @Override
    public void deleteCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    @Override
    public List<CartDTO> getAllCartsByUserId(String userId) {
        List<Cart> carts = cartRepository.findAllByUserId(userId);
        List<CartDTO> cartProductDtos = new ArrayList<>();
        for (Cart cart : carts) {
            CartDTO cartProductDto = new CartDTO();
            cartProductDto.setCartId(cart.getId());
            cartProductDto.setQuantity(cart.getQuantity());
            cartProductDtos.add(cartProductDto);
        }
        return cartProductDtos;
    }

    @Override
    public List<CartDTO> getAllProductsInCartByUserId(String userId) {
        List<Cart> carts = cartRepository.findAllByUserId(userId);
        List<CartDTO> cartDtos = new ArrayList<>();
        for (Cart cart : carts) {
            cartDtos.add(cartDTO(cart));
        }
        return cartDtos;
    }

    private CartDTO cartDTO(Cart cart) {
        CartDTO cartProductDto = new CartDTO();
        cartProductDto.setCartId(cart.getId());
        cartProductDto.setQuantity(cart.getQuantity());
        cartProductDto.setProduct(productService.getProductById(cart.getProductId()));
        cartProductDto.setColor(cart.getColor());
        cartProductDto.setSize(cart.getSize());
        return cartProductDto;
    }

    @Override
    public Cart addCart(Cart cart) {
        List<Cart> existingCarts = cartRepository.findAllByProductIdAndUserIdAndColorIdAndSizeId(
                cart.getProductId(),
                cart.getUserId(),
                cart.getColor().getId(),
                cart.getSize().getId());
        if (!existingCarts.isEmpty()) {
            Cart existingCart = existingCarts.get(0);
            existingCart.setQuantity(existingCart.getQuantity() + cart.getQuantity());
            return cartRepository.save(existingCart);
        } else {
            return cartRepository.save(cart);
        }
    }

    @Override
  
    public void updateQuantity(String userId, Long productId, Integer newQuantity) {
        List<Cart> carts = cartRepository.findByUserIdAndProductId(userId, productId);
        if (!carts.isEmpty()) {
            Cart cart = carts.get(0);
            cart.setQuantity(newQuantity);
            cartRepository.save(cart);
        }
    }
}