package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.PriceWeddingTime;
import com.doan.WedResManage.pojo.WeddingPartyOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Date;
@Repository
public interface WeddingPartyOrdersRepository extends JpaRepository<WeddingPartyOrders, Integer>, JpaSpecificationExecutor<WeddingPartyOrders> {
    WeddingPartyOrders findByOrderDateAndPwtId(Date orderDate, PriceWeddingTime ptwId);
}