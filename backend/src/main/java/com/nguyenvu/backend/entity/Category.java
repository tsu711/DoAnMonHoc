package com.nguyenvu.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity


public class Category {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String name;
private int isHome;
@OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
@JsonIgnore
private List<Product> products;
}