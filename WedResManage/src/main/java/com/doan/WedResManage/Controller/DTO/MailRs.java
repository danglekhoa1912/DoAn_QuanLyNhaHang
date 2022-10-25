package com.doan.WedResManage.Controller.DTO;

import java.util.Date;

public class MailRs {
    private String name;
    private int id;
    private String hall;
    private int hallPrice;
    private int servicePrice;
    private int menuPrice;
    private Date time;
    private String mobile;
    private String status;
    private int count;
    private int total;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public MailRs(String name, int id, String hall, int hallPrice, int servicePrice, int menuPrice, Date time, String mobile, String status, int count, int total) {
        this.name = name;
        this.id = id;
        this.hall = hall;
        this.hallPrice = hallPrice;
        this.servicePrice = servicePrice;
        this.menuPrice = menuPrice;
        this.time = time;
        this.mobile = mobile;
        this.status = status;
        this.count = count;
        this.total = total;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getHallPrice() {
        return hallPrice;
    }

    public void setHallPrice(int hallPrice) {
        this.hallPrice = hallPrice;
    }

    public int getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(int servicePrice) {
        this.servicePrice = servicePrice;
    }

    public int getMenuPrice() {
        return menuPrice;
    }

    public void setMenuPrice(int menuPrice) {
        this.menuPrice = menuPrice;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

}
