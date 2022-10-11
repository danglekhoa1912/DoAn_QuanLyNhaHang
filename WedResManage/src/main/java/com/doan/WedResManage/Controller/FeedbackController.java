package com.doan.WedResManage.Controller;

import com.doan.WedResManage.Controller.DTO.FeedbackRq;
import com.doan.WedResManage.Repository.FeedbackRepository;
import com.doan.WedResManage.pojo.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    private static final int pageSize=20;
    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping(value="/getall")
    public ResponseEntity<List<FeedbackRq>> getAllFeedback(@RequestParam Map<String,String> params){
        int page=Integer.parseInt(params.getOrDefault("page","0"));
        Pageable pageable= PageRequest.of(page,pageSize);
        List<Feedback> feedbacks=feedbackRepository.findAll(pageable).getContent();
        List<FeedbackRq> result=new ArrayList<>();
        feedbacks.forEach(fb->{
            FeedbackRq f=new FeedbackRq();
            f.setContent(fb.getContent());
            f.setId(fb.getId());
            f.setTime(fb.getCreateDate());
            f.setUserId(fb.getUserId().getId());
            result.add(f);
        });
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping(value = "/get/id={id}")
    public ResponseEntity<List<FeedbackRq>> getFeedbackById(@PathVariable("id") int id){
        List<FeedbackRq> result=new ArrayList<>();
        List<Feedback> feedbacks=feedbackRepository.findAllByUserId_Id(id);
        if (!feedbacks.isEmpty()) {
            feedbacks.forEach(fb->{
                FeedbackRq f=new FeedbackRq();
                f.setContent(fb.getContent());
                f.setId(fb.getId());
                f.setTime(fb.getCreateDate());
                f.setUserId(fb.getUserId().getId());
                result.add(f);
            });
        }
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
