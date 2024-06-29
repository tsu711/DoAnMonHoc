package com.nguyenvu.backend.controller;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.nguyenvu.backend.entity.User;
import com.nguyenvu.backend.repository.UserRepository;
import com.nguyenvu.backend.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, exposedHeaders= "Content-Range")

@RequestMapping("/api/users")
public class UserController {
    private static final byte[] SECRET_KEY = null;
    @Autowired
    private UserRepository userRepository;
    private UserService userService;
    // Create User REST API

@PostMapping

public ResponseEntity<User> createUser(@RequestBody User User) {
User savedUser = userService.createUser(User);
return new ResponseEntity<>(savedUser, HttpStatus.CREATED);


}
// Get User by id REST API

// http://1ocalhost:8080/api/Users/1

@GetMapping("{id}")
public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
    User user = userService.getUserById(id);
    if (user != null) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
// Get All Users REST API

// http://1ocalhost:8080/api/Users

@GetMapping

public ResponseEntity<List<User>> getAllUsers() {
List<User> Users = userService.getAllUsers();
HttpHeaders headers = new HttpHeaders();
headers.add("Content-Range", "item 0-"+ Users.size()+"/"+Users.size());
return ResponseEntity.ok().headers(headers).body(Users);



}
// Update User REST API
@PutMapping("{id}")
// http://localhost:8080/api/Users/1
public ResponseEntity<User> updateUser(@PathVariable("id") Long UserId,
@RequestBody User User) {
User.setId(UserId);
User updatedUser = userService.updateUser(User);
return new ResponseEntity<>(updatedUser, HttpStatus.OK);
}
// Delete User REST API

@DeleteMapping("{id}")

public ResponseEntity<String> deleteUser(@PathVariable("id") Long UserId) {
    userService.deleteUser(UserId);
return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
}
@PostMapping("/register")
public ResponseEntity register(@RequestBody User user) {
    userRepository.save(user);

    
    return new ResponseEntity("Dang ky thanh cong",HttpStatus.OK);
}


@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {
    try {
        // Thực hiện băm mật khẩu và thêm muối
        Optional<User> existingUser = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());

        if (existingUser.isPresent()) {
            // Lấy thông tin người dùng từ existingUser
            User loggedInUser = existingUser.get();

            // Tạo một đối tượng chứa thông tin cần trả về cho người dùng
            Map<String, Object> response = new HashMap<>();
            response.put("fullname", loggedInUser.getFullname()); // Thêm số điện thoại vào response
            response.put("username", loggedInUser.getUsername());
            response.put("token", generateJwt(loggedInUser)); // Thêm token vào response
            response.put("email", loggedInUser.getEmail()); // Thêm email vào response
            response.put("address", loggedInUser.getAddress()); // Thêm địa chỉ vào response
            response.put("phone_number", loggedInUser.getPhone_number()); // Thêm số điện thoại vào response
            response.put("id", loggedInUser.getId()); 
            // Trả về response
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập thất bại");
        }
    } catch (Exception e) {
        // Xử lý ngoại lệ và trả về thông báo lỗi phù hợp
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi trong quá trình đăng nhập");
    }
}

 public static String generateJwt(User user) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 86400000); // 1 ngày

        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiration)
                // .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        return token;
    }

@PostMapping("/logout")
public ResponseEntity<?> logout(HttpServletRequest request) {
    try {
        // Thực hiện logic đăng xuất tùy chỉnh ở đây (ví dụ: hủy phiên)
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        // Xử lý ngoại lệ và trả về thông báo lỗi phù hợp
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi trong quá trình đăng xuất");
    }
}
@GetMapping("/check-username/{username}")
public ResponseEntity<?> checkUsernameExists(@PathVariable("username") String username) {
    Optional<User> existingUser = userRepository.findByUsername(username);
    if (existingUser.isPresent()) {
        // Username đã tồn tại
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Tên đăng nhập đã tồn tại");
    } else {
        // Username chưa tồn tại, có thể đăng ký
        return ResponseEntity.ok("Tên đăng nhập có thể sử dụng");
    }
}

    
}