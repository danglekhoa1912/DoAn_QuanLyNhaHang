package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.PriceWeddingTime;
import com.doan.WedResManage.pojo.User;
import com.doan.WedResManage.pojo.WeddingPartyOrders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Date;
@Repository
public interface WeddingPartyOrdersRepository extends JpaRepository<WeddingPartyOrders, Integer>, JpaSpecificationExecutor<WeddingPartyOrders> {
    WeddingPartyOrders findByOrderDateAndPwtId(Date orderDate, PriceWeddingTime ptwId);
    Page<WeddingPartyOrders> searchWeddingPartyOrdersByUserId(User userId, Pageable pageable);
    Page<WeddingPartyOrders> findAll(Pageable pageable);
}