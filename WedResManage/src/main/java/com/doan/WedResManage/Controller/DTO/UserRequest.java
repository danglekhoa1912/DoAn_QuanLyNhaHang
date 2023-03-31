package com.doan.WedResManage.Controller.DTO;

import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public class UserRequest {
    private String email;
    private String name;
    private String password;

    private Date birthday;
    private MultipartFile avt;
    private String mobile;
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }


    public MultipartFile getAvt() {
        return avt;
    }

    public void setAvt(MultipartFile avt) {
        this.avt = avt;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
