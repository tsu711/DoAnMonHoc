




package com.nguyenvu.backend.service.impl;
 
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Color;
import com.nguyenvu.backend.repository.ColorRepository;
import com.nguyenvu.backend.service.ColorService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class ColorServiceImpl implements ColorService {
    private ColorRepository ColorRepository;

    @Override
    public Color createColor(Color Color) {
        return ColorRepository.save(Color);
    }

    @Override
    public Color getColorById(Long ColorId){
        Optional<Color> optionalColor = ColorRepository.findById(ColorId);
        return optionalColor.get();
    }

     @Override
    public List<Color> getAllColors() {
        return ColorRepository.findAll();
    }
@Override
      public Color updateColor(Color Color){
        Color existingColor = ColorRepository.findById(Color.getId()).get();
        existingColor.setName(Color.getName());

        Color updateColor = ColorRepository.save(existingColor);
        return updateColor;
    }

    @Override
    public void deleteColor(Long ColorId){
        ColorRepository.deleteById(ColorId);
    }

}
