package com.doan.WedResManage.Controller;

import com.doan.WedResManage.Repository.MenuRepository;
import com.doan.WedResManage.pojo.Menu;
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
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuRepository menuRepository;

    @GetMapping(value="/getall")
    public ResponseEntity<List<Menu>> getAllFeedback(){
        return new ResponseEntity<>(menuRepository.findAll(), HttpStatus.OK);
    }
}
