package com.doan.WedResManage.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/staff")
public class ApiStaffController extends ApiAdminController  {
    @Override
    public ResponseEntity<?> getAllOrder(@RequestParam  Map<String, String> params) {
        return super.getAllOrder(params);
    }

    @Override
    public ResponseEntity<?> updateStatusPayment(@RequestBody Map<String, String> params) {
        return super.updateStatusPayment(params);
    }

    @Override
    public ResponseEntity<?> feedback(@RequestParam  Map<String, String> params) {
        return super.feedback(params);
    }
}
