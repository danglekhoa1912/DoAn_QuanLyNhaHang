package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.ServicesDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ServicesDetailRepository extends JpaRepository<ServicesDetail, Integer>, JpaSpecificationExecutor<ServicesDetail> {

}