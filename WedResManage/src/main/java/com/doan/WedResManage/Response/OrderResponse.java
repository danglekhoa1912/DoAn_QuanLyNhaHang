package com.doan.WedResManage.Response;


import com.doan.WedResManage.pojo.MenuDish;
import com.doan.WedResManage.pojo.ServicesDetail;
import com.doan.WedResManage.pojo.WeddingPartyOrders;

import java.util.Date;
import java.util.Set;

public class OrderResponse {
    private int id;
    private String username;
    private String hall;
    private String time;
    private Date date;
    private int price;

    private String typeParty;
    private Boolean paymentstt;
    private String typePay;
    private int countTable;
    private String note;

    private Set<MenuDish> dishList;
    private Set<ServicesDetail> serviceList;
    private WeddingPartyOrders weddingPartyOrders;

    public OrderResponse(WeddingPartyOrders whp) {
        this.id = whp.getId();
        this.hall = whp.getWhId()!=null?whp.getWhId().getName():"Sảnh không còn hoạt động";
        this.time = whp.getPwtId().getSession();
        this.date = whp.getOrderDate();
        this.dishList = whp.getMenuId().getMenuDishSet();
        this.price = whp.getAmount();
        this.paymentstt = whp.getPaymentStatus();
        this.typePay = whp.getTypePay();
        this.countTable = whp.getQuantityTable();
        this.note = whp.getNote();
        this.serviceList = whp.getListServiceId().getServicesDetailSet();
        this.typeParty = whp.getTypeParty().getNameParty();
        this.username=whp.getUserId().getName();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHall() {
        return hall;
    }

    public void setHall(String hall) {
        this.hall = hall;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Set<MenuDish> getDishList() {
        return dishList;
    }

    public void setDishList(Set<MenuDish> dishList) {
        this.dishList = dishList;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Boolean getPaymentstt() {
        return paymentstt;
    }

    public void setPaymentstt(Boolean paymentstt) {
        this.paymentstt = paymentstt;
    }

    public String getTypePay() {
        return typePay;
    }

    public void setTypePay(String typePay) {
        this.typePay = typePay;
    }

    public int getCountTable() {
        return countTable;
    }

    public void setCountTable(int countTable) {
        this.countTable = countTable;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Set<ServicesDetail> getServiceList() {
        return serviceList;
    }

    public void setServiceList(Set<ServicesDetail> serviceList) {
        this.serviceList = serviceList;
    }

    public String getTypeParty() {
        return typeParty;
    }

    public void setTypeParty(String typeParty) {
        this.typeParty = typeParty;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
