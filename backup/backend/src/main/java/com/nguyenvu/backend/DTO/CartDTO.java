package com.nguyenvu.backend.DTO;
import com.nguyenvu.backend.entity.Color;
import com.nguyenvu.backend.entity.Size;
import com.nguyenvu.backend.entity.Product;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CartDTO {
    private Long cartId;
    private Integer quantity;
    private Product product;
    private Color color;
    private Size size;
    
}
