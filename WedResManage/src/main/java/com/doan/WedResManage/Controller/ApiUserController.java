package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Repository.*;
import com.doan.WedResManage.pojo.Dish;
import com.doan.WedResManage.pojo.WeddingHall;
import com.doan.WedResManage.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/api/order")
public class ApiUserController {
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
    private TypePartyController typePartyController;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private WeddingHallRepository weddingHall;

    @RequestMapping(value = "/dish/categoryId={i}", method = RequestMethod.GET)
    public ResponseEntity<List<Dish>> findDishByCategoryId(@PathVariable("i") int i, @RequestParam Map<String, String> params) {
        Pageable pageable = PageRequest.of(Integer.parseInt(params.getOrDefault("page", "0")), pageSize);
        String key = params.getOrDefault("key", "");
        Page<Dish> result = dishRepository.searchDishByCategoryId_IdAndNameContains(i, key, pageable);
        return new ResponseEntity<>(result.getContent(), HttpStatus.OK);
    }

    @RequestMapping(value = "/dish/id={i}", method = RequestMethod.GET)
    public Dish getDishById(@PathVariable("i") int i) {
        Dish result = dishRepository.findById(i).orElseThrow(() -> new RuntimeException("Invalid id"));
        return result;
    }
    @RequestMapping(value = "/dish/getall", method = RequestMethod.GET)
    public ResponseEntity<List<Dish>> getAll(){
        List<Dish> allDish=dishRepository.findAll();
        return new ResponseEntity<>(allDish,HttpStatus.OK);
    }
    @RequestMapping(value="/ish/getAllDish",method = RequestMethod.GET)
    public ResponseEntity<List<Dish>> getAllDish(@RequestParam Map<String,String> params){
        Pageable pageable = PageRequest.of(Integer.parseInt(params.getOrDefault("page","0")), pageSize);
        String search=params.getOrDefault("key","");
        return new ResponseEntity<>(dishRepository.searchDishByNameContains(search,pageable).getContent(),HttpStatus.OK);
    }
    @RequestMapping(value="/dish/count",method = RequestMethod.GET)
    public ResponseEntity<Integer> getCount(@RequestParam Map<String,String> params){
        int categoryId=Integer.parseInt(params.getOrDefault("categoryId","0"));
        if (categoryId!=0){
            return new ResponseEntity<>(dishRepository.countAllByCategoryId_Id(categoryId),HttpStatus.OK);
        }
        return new ResponseEntity<>(dishRepository.findAll().size(),HttpStatus.OK);
    }
    @RequestMapping(value = "/weddinghall/getall", method = RequestMethod.GET)
    public ResponseEntity<List<WeddingHall>> getAllWeddingHall(){
        return new ResponseEntity<>(weddingHall.findAll(), HttpStatus.OK);
    }
}
