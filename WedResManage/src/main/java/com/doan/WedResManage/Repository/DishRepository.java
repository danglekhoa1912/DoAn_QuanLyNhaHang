package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface DishRepository extends JpaRepository<Dish, Integer>, JpaSpecificationExecutor<Dish> {
    int countAllByCategoryId_Id(int id);
    Dish findAllByName(String s);
    Page<Dish> findAll(Pageable pageable);
    Page<Dish> searchDishByNameContainsAndStatus(Pageable pageable,String s,boolean status);
    Page<Dish> searchDishByCategoryId_IdAndNameContainsAndStatus(int id,String s,Pageable pageable, boolean status);
    List<Dish> findAllById(int i);

    Page<Dish> searchDishByNameContains(Pageable pageable,String s);
}