package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.CategoryDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CategoryDishRepository extends JpaRepository<CategoryDish, Integer>, JpaSpecificationExecutor<CategoryDish> {

}