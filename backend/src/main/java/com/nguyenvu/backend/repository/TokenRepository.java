package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Token;




public interface TokenRepository extends JpaRepository<Token, Long> {
    
    
}
