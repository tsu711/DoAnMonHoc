package com.nguyenvu.backend.repository;

import com.nguyenvu.backend.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ColorRepository extends JpaRepository<Color, Long> {
    Optional<Color> findByName(String name);
}
