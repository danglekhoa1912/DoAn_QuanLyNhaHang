package com.doan.WedResManage.Controller.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
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
}
