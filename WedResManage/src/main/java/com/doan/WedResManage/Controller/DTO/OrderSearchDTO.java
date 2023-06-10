package com.doan.WedResManage.Controller.DTO;

import lombok.Data;

@Data
public class OrderSearchDTO {
    private Integer status;
    private String date;
    private Integer page;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }
}
