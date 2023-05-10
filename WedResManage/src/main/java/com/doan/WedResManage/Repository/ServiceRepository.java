package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.ListService;
import com.doan.WedResManage.pojo.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Integer>, JpaSpecificationExecutor<Service> {
    Page<Service> searchServiceByNameContains(String s, Pageable pageable);
    List<Service> findAllById(int id);

    Page<Service> searchServiceByNameContainsAndStatusEquals(String s, Pageable pageable, String status);
}