package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Banner;




public interface BannerRepository extends JpaRepository<Banner, Long> {
    
}
