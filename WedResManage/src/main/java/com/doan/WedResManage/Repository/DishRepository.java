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
    Page<Dish> searchDishByNameContainsAndStatusEquals(Pageable pageable,String s,String status);

    Page<Dish> searchDishByCategoryId_IdAndNameContainsAndStatusEquals(int id,String s,Pageable pageable, String status);
    Long deleteDishById(int id);
    List<Dish> findAllById(int i);

    Page<Dish> searchDishByNameContains(Pageable pageable,String s);
}