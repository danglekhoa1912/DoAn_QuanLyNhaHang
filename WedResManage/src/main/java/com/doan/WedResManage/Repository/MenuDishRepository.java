package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.MenuDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface MenuDishRepository extends JpaRepository<MenuDish, Integer>, JpaSpecificationExecutor<MenuDish> {

    Object findAllById(int i);
    List<MenuDish> findALlByMenuId(int i);
}