    package com.nguyenvu.backend.entity;

    import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    @Table(name = "orders")
    public class Order {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String thumbnail;
        private String fullname;
        private String email;
        private BigDecimal totalMoney; // Use BigDecimal for monetary values
        private String phoneNumber;
        private String address;
        @Temporal(TemporalType.TIMESTAMP)
        private Date orderDate;
        private String status;
        @Column(name = "payment_method")
        private String paymentMethod;
        @Column(name = "user_id") 
        private String userId;
        private List<Long> listIdCart;
    
        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "order")
        private List<OrderDetail> orderDetails = new ArrayList<>();
    
        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "order_id")
        private List<Cart> cart = new ArrayList<>();
    }


