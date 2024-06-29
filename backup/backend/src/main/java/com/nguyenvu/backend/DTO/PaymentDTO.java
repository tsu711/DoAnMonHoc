package com.nguyenvu.backend.DTO;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDTO implements Serializable{
    private String status;
    private String messenge;
    private String URL;
}
