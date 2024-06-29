package com.nguyenvu.backend.repository;

import com.nguyenvu.backend.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SizeRepository extends JpaRepository<Size, Long> {
    Optional<Size> findByName(String name);
}
