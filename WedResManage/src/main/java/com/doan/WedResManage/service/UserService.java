package com.doan.WedResManage.service;

import com.doan.WedResManage.Repository.UserRepository;
import com.doan.WedResManage.Utils.CustomUserDetails;
import com.doan.WedResManage.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService  implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user=userRepository.findByEmail(s);
        if (user==null){
            throw new UsernameNotFoundException(s);
        }
        return new CustomUserDetails(user);
    }
    public UserDetails loadUserById(long i) throws UsernameNotFoundException{
        User user=userRepository.findById(Math.toIntExact(i)).orElseThrow();
        if (user==null){
            throw new UsernameNotFoundException("none");
        }
        return new CustomUserDetails(user);
    }
}
