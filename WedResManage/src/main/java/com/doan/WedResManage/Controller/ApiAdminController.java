package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Controller.DTO.DishRq;
import com.doan.WedResManage.Controller.DTO.WeddingHallRq;
import com.doan.WedResManage.Repository.*;
import com.doan.WedResManage.Response.OrderResponse;
import com.doan.WedResManage.pojo.CategoryDish;
import com.doan.WedResManage.pojo.Dish;
import com.doan.WedResManage.pojo.User;
import com.doan.WedResManage.pojo.WeddingHall;
import com.doan.WedResManage.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/api/admin")
public class ApiAdminController {
    public static final int pageSize = 20;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired(required = true)
    private DishRepository dishRepository;
    @Autowired(required = false)
    private CloudinaryService cloudinaryService;

    @Autowired
    private CategoryDishRepository categoryDishRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WeddingHallRepository weddingHall;
    @Autowired
    private WeddingPartyOrdersRepository weddingPartyOrder;

    @PutMapping(value = "/dish/change/id={i}")
    public String changeNameDish(@ModelAttribute DishRq params, @PathVariable("i") int id) {
        Dish dish = dishRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid id dish"));
        CategoryDish categoryDish = categoryDishRepository.findById(params.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Invalid category ID"));
        dish.setName(params.getName());
        dish.setPrice(params.getPrice());
        dish.setImgae(cloudinaryService.uploadImg(params.getImage(), cloudinary));
        dish.setCategoryId(categoryDish);
        try {
            Dish update = dishRepository.save(dish);
        } catch (Exception ex) {
            return "false";
        }
        return "true";
    }

    @PostMapping(value = "/dish/add")
    public String addDish(@ModelAttribute DishRq params) {
        Dish check = dishRepository.findAllByName(params.getName());
        if (check != null) return check.getId().toString();
        CategoryDish categoryDish = categoryDishRepository.findById(params.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Invalid category ID"));
        Dish dish = new Dish();
        dish.setName(params.getName());
        dish.setPrice(params.getPrice());
        dish.setImgae(cloudinaryService.uploadImg(params.getImage(), cloudinary));
        dish.setCategoryId(categoryDish);
        try {
            Dish update = dishRepository.save(dish);
        } catch (Exception ex) {
            return "false";
        }
        return "true";
    }

    @Transactional
    @PostMapping(value = "/dish/delete")
    public ResponseEntity<Boolean> deleteDish(@RequestBody Map<String, String> params) {
        int i = Integer.parseInt(params.getOrDefault("id", "0"));
        if (!dishRepository.findAllById(i).isEmpty()) {
            long delete = dishRepository.deleteDishById(i);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/weddinghall/add")
    public ResponseEntity<Boolean> addWeddingHall(@ModelAttribute WeddingHallRq wdh) {
        WeddingHall newWdh = new WeddingHall();
        newWdh.setName(wdh.getName());
        newWdh.setCapacity(wdh.getCapacity());
        newWdh.setDescribe(wdh.getDescribe());
        newWdh.setStatus(wdh.getStatus());
        newWdh.setPrice(wdh.getPrice());
        newWdh.setImage(cloudinaryService.uploadImg(wdh.getImage(), cloudinary));
        try {
            WeddingHall update = weddingHall.save(newWdh);
            return ResponseEntity.ok(true);
        } catch (Exception ex) {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping(value = "/weddinghall/edit")
    public ResponseEntity<Boolean> editWeddingHall(@ModelAttribute WeddingHallRq wdh) {
        WeddingHall newWdh = new WeddingHall();
        newWdh.setId(wdh.getId());
        newWdh.setName(wdh.getName());
        newWdh.setCapacity(wdh.getCapacity());
        newWdh.setDescribe(wdh.getDescribe());
        newWdh.setStatus(wdh.getStatus());
        newWdh.setPrice(wdh.getPrice());
        newWdh.setImage(cloudinaryService.uploadImg(wdh.getImage(), cloudinary));
        try {
            WeddingHall update = weddingHall.save(newWdh);
            return ResponseEntity.ok(true);
        } catch (Exception ex) {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping(value="/user/getall")
    public ResponseEntity<?> getAllUser(){
        return ResponseEntity.ok(userRepository.findAll());
    }
    @GetMapping("/order/all")
    public ResponseEntity<?> getAllOrder(@RequestParam Map<String,String> params){
        Pageable pageable = PageRequest.of(Integer.parseInt(params.getOrDefault("page", "0")), pageSize);
        List<OrderResponse> orderResponseList=new ArrayList<>();
        weddingPartyOrder.findAll(pageable).getContent().forEach(item->{
            OrderResponse temp=new OrderResponse(item);
            orderResponseList.add(temp);
        });
        return ResponseEntity.ok(orderResponseList);
    }

}
