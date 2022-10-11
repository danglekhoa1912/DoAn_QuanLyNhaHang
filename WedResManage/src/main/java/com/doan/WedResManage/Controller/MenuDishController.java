package com.doan.WedResManage.Controller;

import com.doan.WedResManage.Repository.MenuDishRepository;
import com.doan.WedResManage.pojo.Menu;
import com.doan.WedResManage.pojo.MenuDish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/menuDish")
public class MenuDishController {
    @Autowired
    private MenuDishRepository menuDishRepository;

    @PutMapping(value="/getByIdMenu")
    public ResponseEntity<Object> getAllFeedback(@RequestBody Map<String,String> params){
        int id= Integer.parseInt(params.getOrDefault("id","0"));
        return new ResponseEntity<>(menuDishRepository.findALlByMenuId(id), HttpStatus.OK);
    }
}
