package com.nguyenvu.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonIgnore;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity


public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title", length = 255)
    private String title;
    @Column(name = "price", columnDefinition = "numeric")
    private int price;
    private int discount;
    private String thumbnail;
    private int quantity;
    private String description;
    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color colors;

    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size sizes;
    
    private Date created_at;
    private Date updated_at;
    private int deleted;
    
    @ManyToOne
    private Category category;

    @JsonIgnore
    @ManyToMany(mappedBy = "product")
    private List<Gallery> galleries;
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Cart cart;

    @JsonIgnore
    @ManyToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;

}