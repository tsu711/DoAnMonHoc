




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Banner;
import com.nguyenvu.backend.repository.BannerRepository;
import com.nguyenvu.backend.service.BannerService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class BannerServiceImpl implements BannerService {
    private BannerRepository BannerRepository;

    @Override
    public Banner createBanner(Banner Banner) {
        return BannerRepository.save(Banner);
    }

    @Override
    public Banner getBannerById(Long BannerId){
        Optional<Banner> optionalBanner = BannerRepository.findById(BannerId);
        return optionalBanner.get();
    }

     @Override
    public List<Banner> getAllBanners() {
        return BannerRepository.findAll();
    }
@Override
      public Banner updateBanner(Banner Banner){
        Banner existingBanner = BannerRepository.findById(Banner.getId()).get();
        existingBanner.setThumbnail(Banner.getThumbnail());
     
        Banner updateBanner = BannerRepository.save(existingBanner);
        return updateBanner;
    }

    @Override
    public void deleteBanner(Long BannerId){
        BannerRepository.deleteById(BannerId);
    }

}
