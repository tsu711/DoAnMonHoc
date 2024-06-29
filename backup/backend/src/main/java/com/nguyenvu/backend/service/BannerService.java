package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Banner;

import java.util.List;


public interface BannerService {
    Banner createBanner(Banner Banner);
    Banner getBannerById(Long BannerId);
    List<Banner> getAllBanners();
    Banner updateBanner(Banner Banner);
    void deleteBanner(Long BannerId);

}