package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.PriceWeddingTime;
import com.doan.WedResManage.pojo.User;
import com.doan.WedResManage.pojo.WeddingHall;
import com.doan.WedResManage.pojo.WeddingPartyOrders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Repository
public interface WeddingPartyOrdersRepository extends JpaRepository<WeddingPartyOrders, Integer>, JpaSpecificationExecutor<WeddingPartyOrders> {
    WeddingPartyOrders findByOrderDateAndPwtIdAndWhId(Date orderDate, PriceWeddingTime ptwId, WeddingHall whId);
    Page<WeddingPartyOrders> searchWeddingPartyOrdersByUserId(User userId, Pageable pageable);
    Page<WeddingPartyOrders> findAll(Pageable pageable);
    List<WeddingPartyOrders> findAllById(int id);
    List<WeddingPartyOrders> findByOrderDateBetween(Date start,Date end);
    List<WeddingPartyOrders> findAllByWhIdAndOrderDateAfter(WeddingHall whId, @NotNull Date orderDate);
    long countAllByOrderDateBetween(Date start,Date end);

    long countAllByWhIdAndOrderDateBetween(WeddingHall whId,Date start, Date end);
    List<WeddingPartyOrders> findByOrderDateBetweenAndWhId(Date start,Date end,WeddingHall whId);
    List<WeddingPartyOrders> findAllByOrderDate(Date date);
}