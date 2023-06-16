package com.doan.WedResManage.Controller.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@Getter
@Setter
public class OrderRequest {
    private int idUser;
    private int whId;
    private int pwtId;
    private Date orderDate;
    private List<Integer> menu;
    private int amount;
    private int status;
    private String typePay;
    private int quantity;
    private String note;
    private List<Integer> service;
    private int type_party;
    private String transId;
}
