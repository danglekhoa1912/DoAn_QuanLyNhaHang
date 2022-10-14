package com.doan.WedResManage.Repository;

import com.doan.WedResManage.pojo.TypeParty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TypePartyRepository extends JpaRepository<TypeParty, Integer>, JpaSpecificationExecutor<TypeParty> {
    List<TypeParty> findAllById(int id);
}