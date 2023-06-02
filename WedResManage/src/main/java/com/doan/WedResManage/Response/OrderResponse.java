package com.doan.WedResManage.Response;


import com.doan.WedResManage.pojo.MenuDish;
import com.doan.WedResManage.pojo.ServicesDetail;
import com.doan.WedResManage.pojo.WeddingPartyOrders;
import lombok.Data;

import java.util.Date;
import java.util.Set;
@Data
public class OrderResponse {
    private int id;
    private String username;
    private String hall;
    private int time;
    private Date date;
    private int price;

    private int typeParty;
    private int status;
    private String typePay;
    private int countTable;
    private String note;

    private Set<MenuDish> dishList;
    private Set<ServicesDetail> serviceList;
    private WeddingPartyOrders weddingPartyOrders;

    public OrderResponse(WeddingPartyOrders whp) {
        this.id = whp.getId();
        this.hall = whp.getWhId()!=null?whp.getWhId().getName():"Sảnh không còn hoạt động";
        this.time = whp.getPwtId().getId();
        this.date = whp.getOrderDate();
        this.dishList = whp.getMenuId().getMenuDishSet();
        this.price = whp.getAmount();
        this.status = whp.getStatus();
        this.typePay = whp.getTypePay();
        this.countTable = whp.getQuantityTable();
        this.note = whp.getNote();
        this.serviceList = whp.getListServiceId().getServicesDetailSet();
        this.typeParty = whp.getTypeParty().getId();
        this.username=whp.getUserId().getName();
    }
}
