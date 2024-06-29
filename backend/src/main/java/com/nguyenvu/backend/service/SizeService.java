package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Size;

import java.util.List;


public interface SizeService {
    Size createSize(Size size);
    Size getSizeById(Long sizeId);
    List<Size> getAllSizes();
    Size updateSize(Size size);
    void deleteSize(Long sizeId);

}