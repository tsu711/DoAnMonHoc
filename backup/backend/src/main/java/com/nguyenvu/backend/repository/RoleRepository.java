package com.nguyenvu.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenvu.backend.entity.Role;




public interface RoleRepository extends JpaRepository<Role, Long> {
    
}
