package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    User findByEmail(String email);
    Boolean existsUserByEmail(String email);
    List<User> findAllById(int id);
    Boolean existsUserByMobile(String mobile);
}