package com.doan.WedResManage.Controller;

import com.doan.WedResManage.Repository.FeedbackRepository;
import com.doan.WedResManage.Repository.ListServiceRepository;
import com.doan.WedResManage.pojo.Feedback;
import com.doan.WedResManage.pojo.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/listService")
public class ListServiceController {
    @Autowired
    private ListServiceRepository listServiceRepository;

    @GetMapping(value="/getall")
    public ResponseEntity<List<ListService>> getAllFeedback(){
        return new ResponseEntity<>(listServiceRepository.findAll(), HttpStatus.OK);
    }
}
