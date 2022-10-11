package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.PriceWeddingTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PriceWeddingTimeRepository extends JpaRepository<PriceWeddingTime, Integer>, JpaSpecificationExecutor<PriceWeddingTime> {

}