package com.nguyenvu.backend.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.User;





public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByFullnameAndPassword(String fullname, String password);
}

