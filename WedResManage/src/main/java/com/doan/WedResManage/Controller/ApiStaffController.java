package com.doan.WedResManage.Controller;

import com.doan.WedResManage.Controller.DTO.OrderSearchDTO;
import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Api(value = "StaffController")
@CrossOrigin(maxAge = 3600)
@RequestMapping("api/staff")
public class ApiStaffController extends ApiAdminController  {
    @Override
    public ResponseEntity<?> getAllOrder(@ModelAttribute OrderSearchDTO searchDTO) {
        return super.getAllOrder(searchDTO);
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
