package com.nguyenvu.backend.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullname;
    private String password;
   private String email;
   private String phone_number;
   private String address;

   private Date created_at;
   private Date update_at;
   private int  deleted;

   @ManyToOne
   private Role role;

   @OneToMany(mappedBy = "user")
   private List<Token> token;

    //


    
}
