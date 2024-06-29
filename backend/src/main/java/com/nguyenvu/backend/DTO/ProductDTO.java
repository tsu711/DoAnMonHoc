package com.nguyenvu.backend.DTO;

import java.util.Date;
import java.util.List;


import com.nguyenvu.backend.entity.Cart;
import com.nguyenvu.backend.entity.Color;
import com.nguyenvu.backend.entity.Gallery;
import com.nguyenvu.backend.entity.OrderDetail;
import com.nguyenvu.backend.entity.Size;

import co.elastic.clients.elasticsearch.ml.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String title;
    private int price;
    private int discount;
    private String thumbnail;
    private int quantity;
    private String description;
    private Color colors;
    private Size sizes;

    private Date created_at;
    private Date updated_at;
    private int deleted;

    private Category category;

    private List<Gallery> galleries;

    private Cart cart;

    private List<OrderDetail> orderDetails;
}
