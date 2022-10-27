package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Controller.DTO.*;
import com.doan.WedResManage.Repository.*;
import com.doan.WedResManage.Response.OrderResponse;
import com.doan.WedResManage.pojo.*;
import com.doan.WedResManage.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

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
    @PostMapping("weddinghall/delete")
    public ResponseEntity<?> deleteWDH(@RequestParam Map<String,String> params){
        int i = Integer.parseInt(params.getOrDefault("id", "0"));
        if (weddingHall.findAllById(i).isEmpty()){
            return ResponseEntity.badRequest().body("Không tìm thấy id sảnh");
        }
        weddingHall.deleteById(i);
        return ResponseEntity.ok("Done");
    }
    @GetMapping(value="/user/getall")
    public ResponseEntity<?> getAllUser(){
        return ResponseEntity.ok(userRepository.findAll());
    }
    @Transactional
    @DeleteMapping("/user/delete")
    public ResponseEntity<?> deleteStaff(@RequestBody Map<String, Integer> params){
        int id=params.getOrDefault("id",null);
        if (userRepository.findAllById(id).get(0).getRole().equals("ROLE_STAFF")){
            return ResponseEntity.ok(userRepository.deleteUsersById(id)==1?"Thành công":"Không thành công");
        }
        return ResponseEntity.badRequest().body("Không thành công !");
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
    @PostMapping("/service/add")
    public ResponseEntity<?> addSerivce(@ModelAttribute ServicesRequest service){
        Service newService=new Service(null,service.getPrice(),service.getName(),cloudinaryService.uploadImg(service.getImg(),cloudinary),service.getDescribe());
        try{
          serviceRepository.save(newService);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body("Đã tồn tại dịch vụ !");
        }
        return ResponseEntity.ok("done");
    }
    @PostMapping("/service/edit")
    public ResponseEntity<?> editService(@ModelAttribute ServicesRequest service){
        Service newService=new Service(service.getId(),service.getPrice(),service.getName(),cloudinaryService.uploadImg(service.getImg(),cloudinary),service.getDescribe());
        try{
            serviceRepository.save(newService);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body("Tên dịch vụ đã tồn tại !");
        }
        return ResponseEntity.ok("done");    }
    @DeleteMapping("/service/delete")
    public ResponseEntity<?> deleteService(@RequestBody Map<String, Integer> params){
        try{
            serviceRepository.deleteById(params.getOrDefault("id",null));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body("Error");
        }
        return ResponseEntity.ok("done");
    }
    @PostMapping("/statistical/thismonth")
    public ResponseEntity<?> statisThisMonth(){
        Calendar start_calendar=Calendar.getInstance();
        Calendar end=Calendar.getInstance();
        start_calendar.set(Calendar.DATE,1);
        Date dateStart= start_calendar.getTime();
        Date dateEnd=end.getTime();
        List<WeddingPartyOrders> list=weddingPartyOrder.findByOrderDateBetween(dateStart,dateEnd);
        final int[] count = {0};
        list.forEach(item->{
            count[0] +=item.getAmount();
        });
        return ResponseEntity.ok(new StatisticalResponse((int) weddingPartyOrder.countAllByOrderDateBetween(dateStart,dateEnd), count[0]));
    }
    @PostMapping("/statistical/lastmonth")
    public ResponseEntity<?> statisLastMonth(){
        Calendar start_calendar=Calendar.getInstance();
        start_calendar.set(Calendar.DATE,1);
        start_calendar.add(Calendar.MONTH,-1);
        Calendar end=Calendar.getInstance();
        end.set(Calendar.DATE,1);
        Date dateStart= start_calendar.getTime();
        Date dateEnd=end.getTime();
        List<WeddingPartyOrders> list=weddingPartyOrder.findByOrderDateBetween(dateStart,dateEnd);
        final int[] count = {0};
        list.forEach(item->{
            count[0] +=item.getAmount();
        });
        return ResponseEntity.ok(new StatisticalResponse((int) weddingPartyOrder.countAllByOrderDateBetween(dateStart,dateEnd), count[0]));
    }
    @PostMapping("/statistical/search")
    public ResponseEntity<?> statistical(@RequestBody Map<String,Date> params){
        Date dateStart=params.getOrDefault("start",null);
        Date dateEnd=params.getOrDefault("end",null);
        List<WeddingPartyOrders> list = weddingPartyOrder.findByOrderDateBetween(dateStart,dateEnd);
        final int[] count = {0};
        list.forEach(item->{
            count[0] +=item.getAmount();
        });
        return ResponseEntity.ok(new StatisticalResponse((int) weddingPartyOrder.countAllByOrderDateBetween(dateStart,dateEnd), count[0]));
    }
    @GetMapping("/statistical/hall/thismonth")
    public ResponseEntity<?> statisByHall() {
        Calendar start_calendar = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        start_calendar.set(Calendar.DATE, 1);
        Date dateStart = start_calendar.getTime();
        Date dateEnd = end.getTime();
        List<StatisHallResponse> detail = new ArrayList<>();
        weddingHall.findAll().forEach(item -> {
            int total = weddingPartyOrder.findByOrderDateBetweenAndWhId(dateStart, dateEnd, item).stream().mapToInt(WeddingPartyOrders::getAmount).sum();
            StatisHallResponse temp = new StatisHallResponse(item.getName(), Math.toIntExact(weddingPartyOrder.countAllByWhIdAndOrderDateBetween(item, dateStart, dateEnd)), total);
            detail.add(temp);
        });
        return ResponseEntity.ok(detail);
    }
    @GetMapping("/statistical/hall/lastmonth")
    public ResponseEntity<?> statisLast(){
        Calendar start_calendar=Calendar.getInstance();
        start_calendar.set(Calendar.DATE,1);
        start_calendar.add(Calendar.MONTH,-1);
        Calendar end=Calendar.getInstance();
        end.set(Calendar.DATE,1);
        Date dateStart= start_calendar.getTime();
        Date dateEnd=end.getTime();
        List<StatisHallResponse> detail = new ArrayList<>();
        weddingHall.findAll().forEach(item -> {
            int total = weddingPartyOrder.findByOrderDateBetweenAndWhId(dateStart, dateEnd, item).stream().mapToInt(WeddingPartyOrders::getAmount).sum();
            StatisHallResponse temp = new StatisHallResponse(item.getName(), Math.toIntExact(weddingPartyOrder.countAllByWhIdAndOrderDateBetween(item, dateStart, dateEnd)), total);
            detail.add(temp);
        });
        return ResponseEntity.ok(detail);
    }
    @GetMapping("statistical/hall/search")
    public ResponseEntity<?> statisticalSearch(@RequestBody Map<String,Date> params) {
        Date dateStart = params.getOrDefault("start", null);
        Date dateEnd = params.getOrDefault("end", null);
        List<StatisHallResponse> detail = new ArrayList<>();
        weddingHall.findAll().forEach(item -> {
            int total = weddingPartyOrder.findByOrderDateBetweenAndWhId(dateStart, dateEnd, item).stream().mapToInt(WeddingPartyOrders::getAmount).sum();
            StatisHallResponse temp = new StatisHallResponse(item.getName(), Math.toIntExact(weddingPartyOrder.countAllByWhIdAndOrderDateBetween(item, dateStart, dateEnd)), total);
            detail.add(temp);
        });
        return ResponseEntity.ok(detail);
    }
    @PostMapping("order/updatestt")
    public ResponseEntity<?> updateStatusPayment(@RequestBody Map<String,String> params){
        int id=Integer.parseInt(params.getOrDefault("id",null));
        WeddingPartyOrders wpo=weddingPartyOrder.findById(id).orElseThrow();
        wpo.setPaymentStatus(true);
        return ResponseEntity.ok(weddingPartyOrder.save(wpo));
    }
    @GetMapping("feedback/getall")
    public ResponseEntity<?> feedback(@RequestParam Map<String,String> params){
        Pageable pageable= PageRequest.of(Integer.parseInt(params.getOrDefault("page", "0")), pageSize);
        return ResponseEntity.ok(feedbackRepository.findAll(pageable).getContent());
    }
}
