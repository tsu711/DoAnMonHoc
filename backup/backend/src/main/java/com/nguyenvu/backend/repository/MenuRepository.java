package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Menu;




public interface MenuRepository extends JpaRepository<Menu, Long> {
    
}
