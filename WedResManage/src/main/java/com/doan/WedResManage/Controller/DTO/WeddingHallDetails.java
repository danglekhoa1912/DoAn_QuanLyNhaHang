package com.doan.WedResManage.Controller.DTO;

import java.util.Date;

public class WeddingHallDetails {
    private Date date;
    private int session;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getSession() {
        return session;
    }

    public void setSession(int session) {
        this.session = session;
    }

    public WeddingHallDetails(Date date, int session) {
        this.date = date;
        this.session = session;
    }
}
