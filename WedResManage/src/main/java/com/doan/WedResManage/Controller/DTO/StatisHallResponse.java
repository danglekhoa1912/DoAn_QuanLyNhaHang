package com.doan.WedResManage.Controller.DTO;

public class StatisHallResponse {
    private String name;
    private int count;
    private int total;

    public StatisHallResponse(String name, int count, int total) {
        this.name = name;
        this.count = count;
        this.total = total;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
