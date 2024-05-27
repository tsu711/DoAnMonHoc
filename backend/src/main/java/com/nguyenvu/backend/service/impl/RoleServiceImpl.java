




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Role;
import com.nguyenvu.backend.repository.RoleRepository;
import com.nguyenvu.backend.service.RoleService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;

    @Override
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role getRoleById(Long roleId){
        Optional<Role> optionalRole = roleRepository.findById(roleId);
        return optionalRole.get();
    }

     @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
@Override
      public Role updateRole(Role Role){
        Role existingRole = roleRepository.findById(Role.getId()).get();
        existingRole.setCreated_at(Role.getCreated_at());
        Role updateRole = roleRepository.save(existingRole);
        return updateRole;
    }

    @Override
    public void deleteRole(Long roleId){
        roleRepository.deleteById(roleId);
    }

}
