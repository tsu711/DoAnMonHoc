package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Gallery;

import java.util.List;


public interface GalleryService {
    Gallery createGallery(Gallery gallery);
    Gallery getGalleryById(Long galleryId);
    List<Gallery> getAllGalleries();
    Gallery updateGallery(Gallery gallery);
    void deleteGallery(Long galleryId);

}