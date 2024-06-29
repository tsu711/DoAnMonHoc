package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Gallery;




public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    
}
