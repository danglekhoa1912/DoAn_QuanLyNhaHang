package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Controller.DTO.UserRequest;
import com.doan.WedResManage.Repository.UserRepository;
import com.doan.WedResManage.Response.BadLoginResponse;
import com.doan.WedResManage.Response.CustomUserDetails;
import com.doan.WedResManage.Response.LoginRequest;
import com.doan.WedResManage.Response.LoginResponse;
import com.doan.WedResManage.pojo.User;
import com.doan.WedResManage.service.CloudinaryService;
import com.doan.WedResManage.service.jwt.JwtAuthenticationFilter;
import com.doan.WedResManage.service.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

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
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // Xác thực từ username và password.
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

        }catch (AuthenticationException exception){
            return ResponseEntity.ok(new BadLoginResponse("200","Thông tin đăng nhập không chính xác"));
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println(authentication);
        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        return ResponseEntity.ok(new LoginResponse(jwt));
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
    @GetMapping("/user/profile")
    public ResponseEntity<?> userDetail(HttpServletRequest request){
        if (jwtAuthenticationFilter.getJwtFromRequest(request)!=null){
            User detail=userRepository.findByEmail(tokenProvider.getUserIdFromJWT(jwtAuthenticationFilter.getJwtFromRequest(request)));
            return ResponseEntity.ok(detail);
        }
        return ResponseEntity.ok("Không có quyền truy cập");
    }
    @PostMapping("/user/profile")
    public ResponseEntity<?> userDetailEdit(HttpServletRequest request, @ModelAttribute UserRequest model){
        try{
            if (jwtAuthenticationFilter.getJwtFromRequest(request)!=null){
                User detail=userRepository.findByEmail(tokenProvider.getUserIdFromJWT(jwtAuthenticationFilter.getJwtFromRequest(request)));
                detail.setName(model.getName());
                detail.setMobile(model.getMobile());
                detail.setBirthday(model.getBirthday());
                if (model.getAvt()!=null)
                    detail.setAvatar(cloudinaryService.uploadImg(model.getAvt(), cloudinary));
                User newUser= userRepository.save(detail);
                return ResponseEntity.ok(newUser);
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Vui lòng kiểm tra lại thông tin !");
        }
        return ResponseEntity.ok("Không có quyền truy cập");
    }
    @PostMapping("/user/pass")
    public ResponseEntity<?> userChangePass(HttpServletRequest request, @RequestBody Map<String,String> params){
        String pass=params.getOrDefault("pass",null);
        String newPass=params.getOrDefault("newPass",null);
        if (jwtAuthenticationFilter.getJwtFromRequest(request)!=null){
            User detail=userRepository.findByEmail(tokenProvider.getUserIdFromJWT(jwtAuthenticationFilter.getJwtFromRequest(request)));
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            detail.getEmail(),
                            pass
                    )
            );
            if (authentication.isAuthenticated()){
                detail.setPassword(encoder.encode(newPass));
                userRepository.save(detail);
                return ResponseEntity.ok("Done");
            }
            return ResponseEntity.ok("Wrong password");
        }
        return ResponseEntity.ok(false);
    }
}