package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.ListService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ListServiceRepository extends JpaRepository<ListService, Integer>, JpaSpecificationExecutor<ListService> {

}