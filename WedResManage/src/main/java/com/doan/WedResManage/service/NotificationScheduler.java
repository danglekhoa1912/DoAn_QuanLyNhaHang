package com.doan.WedResManage.service;

import com.doan.WedResManage.Repository.UserRepository;
import com.doan.WedResManage.Repository.WeddingPartyOrdersRepository;
import com.doan.WedResManage.pojo.User;
import com.doan.WedResManage.pojo.WeddingPartyOrders;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@EnableScheduling
public class NotificationScheduler {
    @Autowired
    private WeddingPartyOrdersRepository weddingPartyOrdersRepository;
    @Autowired
    private FirebaseApp fcmService;
    @Scheduled(cron = "0 7 13 * * ?") // Chạy vào 7h sáng hàng ngày
    public void sendNotificationToCustomers() {
        List<User> users = getCustomers();

        for (User customer : users) {
            Message message = Message.builder()
                    .setNotification(Notification.builder()
                            .setTitle("Thông báo")
                            .setBody("Hôm nay bạn có tiệc ở nhà hàng chúng tôi !")
                            .build())
                    .setToken(customer.getToken())
                    .build();

            // Gửi thông báo
            try {
                FirebaseMessaging.getInstance().send(message);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    private List<User> getCustomers() {
        List<User> users = new ArrayList<User>();
        List<WeddingPartyOrders> ordersToday = weddingPartyOrdersRepository.findAllByOrderDate(new Date());
        for (WeddingPartyOrders order: ordersToday){
            if (!users.stream().anyMatch(user -> user.getId()==order.getUserId().getId())){
                users.add(order.getUserId());
            }
        }
        return users;
    }
}
