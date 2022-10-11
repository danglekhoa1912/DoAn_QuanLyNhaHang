package com.doan.WedResManage.Repository;

import com.doan.WedResManage.Controller.DTO.FeedbackRq;
import com.doan.WedResManage.pojo.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer>, JpaSpecificationExecutor<Feedback> {
    Page<Feedback> findAll(Pageable pageable);
    List<Feedback> findAllByUserId_Id(int Id);
}