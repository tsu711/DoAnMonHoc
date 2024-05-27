




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Gallery;
import com.nguyenvu.backend.repository.GalleryRepository;
import com.nguyenvu.backend.service.GalleryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class GalleryServiceImpl implements GalleryService {
    private GalleryRepository galleryRepository;

    @Override
    public Gallery createGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    @Override
    public Gallery getGalleryById(Long galleryId){
        Optional<Gallery> optionalGallery = galleryRepository.findById(galleryId);
        return optionalGallery.get();
    }

     @Override
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }
@Override
      public Gallery updateGallery(Gallery Gallery){
        Gallery existingGallery = galleryRepository.findById(Gallery.getId()).get();
        existingGallery.setThumbnail(Gallery.getThumbnail());
        Gallery updateGallery = galleryRepository.save(existingGallery);
        return updateGallery;
    }

    @Override
    public void deleteGallery(Long galleryId){
        galleryRepository.deleteById(galleryId);
    }

}
