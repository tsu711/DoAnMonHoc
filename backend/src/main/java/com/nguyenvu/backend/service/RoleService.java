package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Role;

import java.util.List;


public interface RoleService {
    Role createRole(Role role);
    Role getRoleById(Long roleId);
    List<Role> getAllRoles();
    Role updateRole(Role role);
    void deleteRole(Long roleId);

}