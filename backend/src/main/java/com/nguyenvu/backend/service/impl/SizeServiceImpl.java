




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Size;
import com.nguyenvu.backend.repository.SizeRepository;
import com.nguyenvu.backend.service.SizeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class SizeServiceImpl implements SizeService {
    private SizeRepository SizeRepository;

    @Override
    public Size createSize(Size Size) {
        return SizeRepository.save(Size);
    }

    @Override
    public Size getSizeById(Long SizeId){
        Optional<Size> optionalSize = SizeRepository.findById(SizeId);
        return optionalSize.get();
    }

     @Override
    public List<Size> getAllSizes() {
        return SizeRepository.findAll();
    }
@Override
      public Size updateSize(Size Size){
        Size existingSize = SizeRepository.findById(Size.getId()).get();
        existingSize.setName(Size.getName());

        Size updateSize = SizeRepository.save(existingSize);
        return updateSize;
    }

    @Override
    public void deleteSize(Long SizeId){
        SizeRepository.deleteById(SizeId);
    }

}
