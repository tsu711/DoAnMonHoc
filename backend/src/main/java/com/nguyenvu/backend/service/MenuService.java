package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Menu;

import java.util.List;


public interface MenuService {
    Menu createMenu(Menu Menu);
    Menu getMenuById(Long MenuId);
    List<Menu> getAllMenus();
    Menu updateMenu(Menu Menu);
    void deleteMenu(Long MenuId);

}