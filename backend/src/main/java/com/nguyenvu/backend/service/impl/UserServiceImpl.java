




package com.nguyenvu.backend.service.impl;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.User;
import com.nguyenvu.backend.repository.UserRepository;
import com.nguyenvu.backend.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.get();
    }

     @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
@Override
      public User updateUser(User User){
        User existingUser = userRepository.findById(User.getId()).get();
        existingUser.setFullname(User.getFullname());
        existingUser.setEmail(User.getEmail());
        existingUser.setPhone_number(User.getPhone_number());
        existingUser.setPassword(User.getPassword());
        existingUser.setCreated_at(User.getCreated_at());
        existingUser.setUpdate_at(User.getUpdate_at());
        existingUser.setDeleted(User.getDeleted());
     ;
        
        User updateUser = userRepository.save(existingUser);
        return updateUser;
    }

    @Override
    public void deleteUser(Long userId){
        userRepository.deleteById(userId);
    }

}
