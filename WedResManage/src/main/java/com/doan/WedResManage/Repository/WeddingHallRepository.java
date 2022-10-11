package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.WeddingHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WeddingHallRepository extends JpaRepository<WeddingHall, Integer>, JpaSpecificationExecutor<WeddingHall> {

}