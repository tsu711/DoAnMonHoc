package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Color;

import java.util.List;


public interface ColorService {
    Color createColor(Color color);
    Color getColorById(Long colorId);
    List<Color> getAllColors();
    Color updateColor(Color color);
    void deleteColor(Long colorId);

}