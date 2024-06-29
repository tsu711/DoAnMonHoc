package com.nguyenvu.backend.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nguyenvu.backend.DTO.CartDTO;
import com.nguyenvu.backend.entity.Cart;
import com.nguyenvu.backend.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/carts")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")
public class CartController{
    
     private final CartService cartService;





    

@PostMapping

public ResponseEntity<Cart> addCart(@RequestBody Cart Cart) {
Cart savedCart = cartService.addCart(Cart);
return new ResponseEntity<>(savedCart, HttpStatus.CREATED);


}
// Get Cart by id REST API

// http://1ocalhost:8080/api/Carts/1

@GetMapping("{id}")

public ResponseEntity<Cart> getCartById(@PathVariable("id") Long CartId) {
Cart Cart = cartService.getCartById(CartId);
return new ResponseEntity<>(Cart, HttpStatus.OK);
}
// Get All Carts REST API

// http://localhost:8080/api/Carts

@GetMapping

public ResponseEntity<List<Cart>> getAllCart() {
List<Cart> Carts = cartService.getAllCart();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Carts.size()+"/"+Carts.size());
return ResponseEntity.ok().headers(headers).body(Carts);




}
@PutMapping("/{id}")
public ResponseEntity<Cart> updateCart(@PathVariable("id") Long cartId, @RequestBody Cart updatedCart) {
    Cart cart = cartService.updateCart(cartId, updatedCart);
    if (cart != null) {
        return ResponseEntity.ok(cart);
    } else {
        return ResponseEntity.notFound().build();
    }
}
// Delete Cart REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteCart(@PathVariable("id") Long CartId) {
cartService.deleteCart(CartId);
return new ResponseEntity<>("Cart successfully deleted!", HttpStatus.OK);
}
@GetMapping("/users/{userId}")
public ResponseEntity<List<CartDTO>> getAllProductsInCartByUserId(
        @PathVariable("userId") String userId) {
    return ResponseEntity.ok(cartService.getAllProductsInCartByUserId(userId));
}
    @PutMapping("/{userId}/products/{productId}")
    public ResponseEntity<String> updateQuantity(
            @PathVariable String userId,
            @PathVariable Long productId,
            @RequestParam Integer newQuantity) {
        cartService.updateQuantity(userId, productId, newQuantity);
        return ResponseEntity.status(HttpStatus.OK).body("Quantity updated successfully.");
    }
    

    


}