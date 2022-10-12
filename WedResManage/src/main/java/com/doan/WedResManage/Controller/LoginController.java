package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Controller.DTO.UserRequest;
import com.doan.WedResManage.Repository.UserRepository;
import com.doan.WedResManage.Utils.CustomUserDetails;
import com.doan.WedResManage.Utils.LoginRequest;
import com.doan.WedResManage.Utils.LoginResponse;
import com.doan.WedResManage.pojo.User;
import com.doan.WedResManage.service.CloudinaryService;
import com.doan.WedResManage.service.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/auth/")
public class LoginController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired(required = false)
    private CloudinaryService cloudinaryService;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public LoginResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        return new LoginResponse(jwt);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@ModelAttribute UserRequest userRequest) {
        if (userRepository.existsUserByEmail(userRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already taken!");
        }

        if (userRepository.existsUserByMobile(userRequest.getMobile())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Mobile is already in use!");
        }
        User user=new User();
        user.setEmail(userRequest.getEmail());
        user.setName(userRequest.getName());
        user.setBirthday(userRequest.getBirthday());
        user.setMobile(userRequest.getMobile());
        user.setPassword(encoder.encode(userRequest.getPassword()));
        user.setAvatar(cloudinaryService.uploadImg(userRequest.getAvt(), cloudinary));
        user.setRole("ROLE_USER");
        userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }
}