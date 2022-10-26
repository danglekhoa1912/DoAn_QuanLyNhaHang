package com.doan.WedResManage.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/staff")
public class ApiStaffController extends ApiAdminController  {
    @Override
    public ResponseEntity<?> getAllOrder(Map<String, String> params) {
        return super.getAllOrder(params);
    }
}
