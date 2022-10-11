package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.WeddingPartyOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WeddingPartyOrdersRepository extends JpaRepository<WeddingPartyOrders, Integer>, JpaSpecificationExecutor<WeddingPartyOrders> {

}