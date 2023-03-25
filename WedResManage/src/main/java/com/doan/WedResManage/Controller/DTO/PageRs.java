package com.doan.WedResManage.Controller.DTO;

public class PageRs {
    private int page;
    private String searchByName;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getSearchByName() {
        return searchByName;
    }

    public void setSearchByName(String searchByName) {
        this.searchByName = searchByName;
    }
}
