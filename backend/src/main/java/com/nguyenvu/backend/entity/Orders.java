package com.nguyenvu.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonIgnore;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity


public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;
    private String fullname;
    private String email;
    private String thumbnail;
    private String phone_number;
    private String address;
    private String note;
    private Date order_date;
    private int status;
    private int total_money;
    @ManyToOne
    private User user;
    @JsonIgnore
    @OneToMany(mappedBy="order")
    private List<OrderDetail> orderdetail=new ArrayList<>();

}
