package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.PriceWeddingTime;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface PriceWeddingTimeRepository extends JpaRepository<PriceWeddingTime, Integer>, JpaSpecificationExecutor<PriceWeddingTime> {
        Optional<PriceWeddingTime> findById(int id);
        List<PriceWeddingTime> findAllById(int id);
}