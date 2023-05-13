package com.doan.WedResManage.Controller.DTO;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class WeddingHallRq {
    private int id;
    private String name;
    private int capacity;
    private String describe;
    private int price;
    private MultipartFile image;
    private MultipartFile image360;
    private Boolean status;
}
