




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Menu;
import com.nguyenvu.backend.repository.MenuRepository;
import com.nguyenvu.backend.service.MenuService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class MenuServiceImpl implements MenuService {
    private MenuRepository MenuRepository;

    @Override
    public Menu createMenu(Menu Menu) {
        return MenuRepository.save(Menu);
    }

    @Override
    public Menu getMenuById(Long MenuId){
        Optional<Menu> optionalMenu = MenuRepository.findById(MenuId);
        return optionalMenu.get();
    }

     @Override
    public List<Menu> getAllMenus() {
        return MenuRepository.findAll();
    }
@Override
      public Menu updateMenu(Menu Menu){
        Menu existingMenu = MenuRepository.findById(Menu.getId()).get();
        existingMenu.setMenu(Menu.getMenu());
        existingMenu.setMenu_item(Menu.getMenu_item());
        existingMenu.setHref(Menu.getHref());
        Menu updateMenu = MenuRepository.save(existingMenu);
        return updateMenu;
    }

    @Override
    public void deleteMenu(Long MenuId){
        MenuRepository.deleteById(MenuId);
    }

}
