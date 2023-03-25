package com.doan.WedResManage.Controller.DTO;

public class PageRq {
    private int totalRecord;
    private int page;
    private int totalPage;
    private Object record;

    public PageRq(int totalRecord, int page, int totalPage, Object record) {
        this.totalRecord = totalRecord;
        this.page = page;
        this.totalPage = totalPage;
        this.record = record;
    }

    public int getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(int totalRecord) {
        this.totalRecord = totalRecord;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public Object getRecord() {
        return record;
    }

    public void setRecord(Object record) {
        this.record = record;
    }
}
