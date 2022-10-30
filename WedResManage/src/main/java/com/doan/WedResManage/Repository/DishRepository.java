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
    Page<Dish> findAllByCategoryId_Id(int id, Pageable pageable);
    Page<Dish> searchDishByNameContains(String s,Pageable pageable);
    Page<Dish> searchDishByCategoryId_IdAndNameContains(int id,String s,Pageable pageable);
    Long deleteDishById(int id);
    List<Dish> findAllById(int i);
}