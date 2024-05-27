package com.nguyenvu.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


// import com.fasterxml.jackson.annotation.JsonIgnore;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity


public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int price;
    private int num;
    private int total_money;
    private int quantity;
    private int image; 
    
    @ManyToOne
    private Product product;

    @ManyToOne
    private Orders order;
}