package com.doan.WedResManage.Controller.DTO;

public class StatisticalResponse {
    private int count;
    private int total;

    public StatisticalResponse(int count, int total) {
        this.count = count;
        this.total = total;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
