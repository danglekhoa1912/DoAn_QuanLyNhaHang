package com.doan.WedResManage.Controller;

import com.cloudinary.Cloudinary;
import com.doan.WedResManage.Controller.DTO.*;
import com.doan.WedResManage.Repository.*;
import com.doan.WedResManage.Response.OrderResponse;
import com.doan.WedResManage.pojo.*;
import com.doan.WedResManage.service.jwt.JwtAuthenticationFilter;
import com.doan.WedResManage.service.jwt.JwtTokenProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.doan.WedResManage.service.CloudinaryService;
import com.doan.WedResManage.service.SendGridMailService;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;

@Validated
@RestController
@Api(value = "userController")
@RequestMapping("/api/order")
public class ApiUserController {
    public static final int pageSize = 20;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private FirebaseApp firebaseApp;
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
    private SendGridMailService sendGridMailService;
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
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private JwtTokenProvider tokenProvider;


    //Dish
    @GetMapping("/dish/get-category")
    public  ResponseEntity<?> cate() throws FirebaseMessagingException {
        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle("Title")
                        .setBody("Body")
                        .build())
                .setToken("f7RQuSfhRCapjjFPbii3L_:APA91bHRSdv_-Jaw3gYouxr5T6c8bKcJxJutI9BYeOZ-5aa_SDBQRJmvXA_9WDKJj1hiCOW7l2YyrMhoaIkWVdtVZSWoGCWfh5r0wTHabMRQVy-hRpXGWczRsr4KR8o_lVxtFnnL2rWc")
                .build();

        String response = FirebaseMessaging.getInstance().send(message);
        System.out.println("Successfully sent message: " + response);
        return ResponseEntity.ok(categoryDishRepository.findAll());
    }
    @RequestMapping(value = "/dish/categoryId", method = RequestMethod.GET)
    public ResponseEntity<?> findDishByCategoryId(@RequestParam int i, @ModelAttribute PageRs params) {
        Pageable pageable = PageRequest.of(params.getPage(), pageSize);
        String key = params.getSearchByName()==null?"":params.getSearchByName();
        System.out.println();
        Page<Dish> result = dishRepository.searchDishByCategoryId_IdAndNameContains(i, key, pageable);
        return new ResponseEntity<>(result.getContent(), HttpStatus.OK);
    }

//    @RequestMapping(value = "/dish/id={i}", method = RequestMethod.GET)
//    public Dish getDishById(@PathVariable("i") int i) {
//        Dish result = dishRepository.findById(i).orElseThrow(() -> new RuntimeException("Invalid id"));
//        return result;
//    }
//    @RequestMapping(value = "/dish/getall", method = RequestMethod.GET)
//    public ResponseEntity<List<Dish>> getAll(){
//        List<Dish> allDish=dishRepository.findAll();
//        return new ResponseEntity<>(allDish,HttpStatus.OK);
//    }
    @RequestMapping(value="/dish/get-dish",method = RequestMethod.GET)
    public ResponseEntity<PageRq> getAllDish(@ModelAttribute PageRs params) throws JsonProcessingException {
        Pageable pageable = PageRequest.of(params.getPage()-1, pageSize);
        Page<Dish> total=dishRepository.searchDishByNameContains(pageable,params.getSearchByName()==null?"":params.getSearchByName());
        PageRq record=new PageRq(total.getSize(),params.getPage(),total.getTotalPages(),total.getContent());
        return new ResponseEntity<>(record,HttpStatus.OK);
    }
    @RequestMapping(value="/dish/count-by-id",method = RequestMethod.GET)
    public ResponseEntity<Integer> getCount(@RequestParam int categoryId){
        if (categoryId!=0){
            return new ResponseEntity<>(dishRepository.countAllByCategoryId_Id(categoryId),HttpStatus.OK);
        }
        return new ResponseEntity<>(dishRepository.findAll().size(),HttpStatus.OK);
    }
    //Wedding hall
    @RequestMapping(value = "/weddinghall/get-all-wedding-hall", method = RequestMethod.GET)
    public ResponseEntity<?> getAllWeddingHall(@ModelAttribute PageRs params){
        Pageable pageable = PageRequest.of(params.getPage()-1, pageSize);
        Page<WeddingHall> total=weddingHall.searchWeddingHallByNameContains(pageable,params.getSearchByName()==null?"":params.getSearchByName());
        PageRq record=new PageRq(total.getSize(),params.getPage(),total.getTotalPages(),total.getContent());
        return new ResponseEntity<>(record,HttpStatus.OK);
    }
    @RequestMapping(value = "/weddinghall/get-detail-wdh", method = RequestMethod.GET)
    public ResponseEntity<?> getDetailHall(@RequestParam int idHall){
        Date now=new Date();
        List<WeddingHallDetails> time = new ArrayList<>();
        List<WeddingPartyOrders> result=weddingPartyOrders.findAllByWhIdAndOrderDateAfter(weddingHall.findById(idHall).get(),now);
        result.forEach(wh->{
            WeddingHallDetails temp=new WeddingHallDetails(wh.getOrderDate(),wh.getPwtId().getId());
            time.add(temp);
        });
        WeddingHallDetailsRequest request=new WeddingHallDetailsRequest(weddingHall.findById(idHall).get(),time);
        return new ResponseEntity<>(request,HttpStatus.OK);
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
    @GetMapping("/service/get-all")
    public ResponseEntity<?> getService(@ModelAttribute PageRs params){
        Pageable pageable = PageRequest.of(params.getPage()-1, pageSize);
        Page<Service> total=serviceRepository.searchServiceByNameContains(params.getSearchByName()==null?"":params.getSearchByName(),pageable);
        PageRq record=new PageRq(total.getSize(),params.getPage(),total.getTotalPages(),total.getContent());
        return new ResponseEntity<>(record,HttpStatus.OK);
    }

    @PostMapping("feedback/add")
    public ResponseEntity<?> addFb(@RequestBody Map<String,String> params){
        int id=Integer.parseInt(params.getOrDefault("id",null));
        String content=params.getOrDefault("content",null);
        Feedback fb=new Feedback();
        fb.setContent(content);
        fb.setUserId(userRepository.findAllById(id).get(0));
        fb.setCreateDate(Date.from(Instant.now()));
        return ResponseEntity.ok(feedbackRepository.save(fb));
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
        total=(total+ menuNew.getPrice())*order.getQuantity();
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
        WeddingPartyOrders finalOrder;
        try{
            finalOrder=weddingPartyOrders.save(wedOrder);
        } catch (Exception ex){
            return ResponseEntity.badRequest().body("Lỗi khi đặt bàn");
        }
        MailRs mailRs=new MailRs(finalOrder.getUserId().getName(),finalOrder.getId(),finalOrder.getWhId().getName(),
                                (int) finalOrder.getWhId().getPrice(),finalOrder.getListServiceId().getPrice(),
                                finalOrder.getMenuId().getPrice(),finalOrder.getOrderDate(),finalOrder.getUserId().getMobile(),
                                finalOrder.getPaymentStatus()==true?"Đã thanh toán":"Chưa thanh toán",finalOrder.getQuantityTable(),
                                finalOrder.getAmount());
        sendGridMailService.sendMail(
                "customer",
                Collections.singletonList(finalOrder.getUserId().getEmail()),
                mailRs
        );
        return ResponseEntity.ok(finalOrder);
    }
    @GetMapping("/get-all-order")
    public ResponseEntity<?> getAllOrder(HttpServletRequest request, @ModelAttribute PageRs params){
        Pageable pageable = PageRequest.of(params.getPage(), pageSize);
        List<OrderResponse> orderResponseList=new ArrayList<>();
        if (jwtAuthenticationFilter.getJwtFromRequest(request) != null) {
            User user = userRepository.findByEmail(tokenProvider.getUserIdFromJWT(jwtAuthenticationFilter.getJwtFromRequest(request)));
            if(user.getRole()=="ROLE_STAFF"){
                return ResponseEntity.ok(weddingPartyOrders.findAll(pageable));
            }
            String email = user.getEmail();
            weddingPartyOrders.searchWeddingPartyOrdersByUserId(userRepository.findByEmail(email),pageable).getContent().forEach(item->{
                OrderResponse temp=new OrderResponse(item);
                orderResponseList.add(temp);
            });
            Page<OrderResponse> total = new PageImpl<>(orderResponseList, pageable, orderResponseList.size());
            PageRq page=new PageRq(total.getSize(),params.getPage(),total.getTotalPages(),total.getContent());
            return ResponseEntity.ok(page);
        }
        else {
            return ResponseEntity.badRequest().body("Bạn cần đăng nhap để thực hiện chức năng này");
        }

    }
    @GetMapping("/type-party")
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
