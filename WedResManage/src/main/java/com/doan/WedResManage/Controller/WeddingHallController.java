package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Controller.DTO.WeddingHallRq;
import com.doan.WedResManage.Repository.WeddingHallRepository;
import com.doan.WedResManage.pojo.Dish;
import com.doan.WedResManage.pojo.WeddingHall;
import com.doan.WedResManage.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/weddinghall")
public class WeddingHallController {
    @Autowired
    private Cloudinary cloudinary;
    @Autowired(required = false)
    private CloudinaryService cloudinaryService;
    @Autowired
    private WeddingHallRepository weddingHall;

}
