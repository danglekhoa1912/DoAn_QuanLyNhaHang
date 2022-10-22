package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Controller.DTO.OrderRequest;
import com.doan.WedResManage.Repository.*;
import com.doan.WedResManage.Response.OrderResponse;
import com.doan.WedResManage.pojo.*;
import com.doan.WedResManage.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    private ServiceRepository serviceRepository;
    @Autowired
    private WeddingHallRepository weddingHall;
    @Autowired
    private WeddingPartyOrdersRepository weddingPartyOrders;
    @Autowired
    private PriceWeddingTimeRepository priceWeddingTimeRepository;
    @Autowired
    private MenuDishRepository menuDishRepository;
    @Autowired
    private ListServiceRepository listService;
    @Autowired
    private ServicesDetailRepository servicesDetailRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TypePartyRepository typePartyRepository;


    //Dish
    @GetMapping("/dish/getcate")
    public  ResponseEntity<?> cate(@RequestParam Map<String,String> params){
        int id=Integer.parseInt(params.getOrDefault("id","0"));
        if (id==0){
            return ResponseEntity.ok(categoryDishRepository.findAll());
        }
        else return ResponseEntity.ok(categoryDishRepository.findAllById(id).get(0));
    }
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
    @RequestMapping(value="/dish/getAllDish",method = RequestMethod.GET)
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
    //Wedding hall
    @RequestMapping(value = "/weddinghall/getall", method = RequestMethod.GET)
    public ResponseEntity<?> getAllWeddingHall(@RequestParam Map<String,String> param){
        int id=Integer.parseInt(param.getOrDefault("id","0"));
        return id!=0?ResponseEntity.ok(weddingHall.findAllById(id)):ResponseEntity.ok(weddingHall.findAll());
    }
    @PutMapping("/checktime")
    public ResponseEntity<?> getCheckTime(@RequestBody Map<String,String> params) throws ParseException {
        String simpleDate=params.getOrDefault("date",null);
        int time=Integer.parseInt(params.getOrDefault("time",null));
        int hall= Integer.parseInt(params.getOrDefault("hall", null));
        Date date=new SimpleDateFormat("yyyy-MM-dd").parse(simpleDate);
        PriceWeddingTime prw=priceWeddingTimeRepository.findById(time).orElseThrow();
        WeddingHall wdh=weddingHall.findAllById(hall).get(0);
        return ResponseEntity.ok(weddingPartyOrders.findByOrderDateAndPwtIdAndWhId(date,prw,wdh)!=null?false:true);
    }
    //Service
    @GetMapping("/service/getall")
    public ResponseEntity<?> getService(@RequestParam Map<String,String> params){
        Pageable pageable = PageRequest.of(Integer.parseInt(params.getOrDefault("page", "0")), pageSize);
        String key = params.getOrDefault("key", "");
        return ResponseEntity.ok(serviceRepository.searchServiceByNameContains(key,pageable).getContent());
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody OrderRequest order){
        WeddingPartyOrders wedOrder=new WeddingPartyOrders();
        int total=0;
        //Add wedding hall
        WeddingHall wdh=weddingHall.findAllById(order.getWhId()).get(0);
        wedOrder.setWhId(wdh);
        //add user id
        User user=userRepository.findAllById(order.getIdUser()).get(0);
        wedOrder.setUserId(user);
        //add time
        PriceWeddingTime time=priceWeddingTimeRepository.findAllById(order.getPwtId()).get(0);
        total= (int) (wdh.getPrice()*time.getPrice());
        wedOrder.setPwtId(time);
        //add order_date
        wedOrder.setOrderDate(order.getOrderDate());
        //add menu
        Menu menu=new Menu();
        menu.setPrice(0);
        Menu menuNew =menuRepository.save(menu);
        order.getMenu().forEach(item->{
            MenuDish menuDish=new MenuDish();
            menuDish.setMenuId(menuNew);
            menuDish.setDishId(dishRepository.findAllById(item).get(0));
            menuNew.setPrice(menuNew.getPrice()+menuDish.getDishId().getPrice());
            menuRepository.save(menuNew);
            menuDishRepository.save(menuDish);
        });
        wedOrder.setMenuId(menuNew);
        wedOrder.setQuantityTable(order.getQuantity());
        total+=menuNew.getPrice()*order.getQuantity();
        //add service
        ListService listservice=new ListService();
        listservice.setPrice(0);
        ListService listServiceNew=listService.save(listservice);
        order.getService().forEach(item->{
            ServicesDetail servicesDetail=new ServicesDetail();
            servicesDetail.setListServiceId(listServiceNew);
            servicesDetail.setServiceId(serviceRepository.findAllById(item).get(0));
            listServiceNew.setPrice(listServiceNew.getPrice()+servicesDetail.getServiceId().getPrice());
            servicesDetailRepository.save(servicesDetail);
            listService.save(listServiceNew);
        });
        wedOrder.setListServiceId(listServiceNew);
        total+=listServiceNew.getPrice();
        wedOrder.setAmount(total);
        wedOrder.setPaymentStatus(order.getPaymentStatus());
        wedOrder.setTypePay(order.getTypePay());
        wedOrder.setNote(order.getNote());
        wedOrder.setTypeParty(typePartyRepository.findAllById(order.getType_party()).get(0));
        return ResponseEntity.ok(weddingPartyOrders.save(wedOrder));
    }
    @GetMapping("/allorder")
    public ResponseEntity<?> getAllOrder(@RequestParam Map<String,String> params){
        Pageable pageable = PageRequest.of(Integer.parseInt(params.getOrDefault("page", "0")), pageSize);
        List<OrderResponse> orderResponseList=new ArrayList<>();
        int id=Integer.parseInt(params.getOrDefault("id","0"));
        if (id==0) return ResponseEntity.badRequest().body("ERROR");
        weddingPartyOrders.searchWeddingPartyOrdersByUserId(userRepository.findAllById(id).get(0),pageable).getContent().forEach(item->{
            OrderResponse temp=new OrderResponse(item);
            orderResponseList.add(temp);
        });
        return ResponseEntity.ok(orderResponseList);
    }
    @GetMapping("/typeparty")
    public ResponseEntity<?> getTypeParty(){
        return ResponseEntity.ok(typePartyRepository.findAll());
    }
    @GetMapping("/typetime")
    public ResponseEntity<?> getTypeTime(){
        return ResponseEntity.ok(priceWeddingTimeRepository.findAll());
    }
    @GetMapping("/gettypetime")
    public ResponseEntity<?> getTypeTimeById(@RequestParam Map<String,String> param){
        int id=Integer.parseInt(param.getOrDefault("id",null));
        return ResponseEntity.ok(priceWeddingTimeRepository.findAllById(id).get(0));
    }
}
