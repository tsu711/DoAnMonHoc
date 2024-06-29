package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Feedback;




public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
}
