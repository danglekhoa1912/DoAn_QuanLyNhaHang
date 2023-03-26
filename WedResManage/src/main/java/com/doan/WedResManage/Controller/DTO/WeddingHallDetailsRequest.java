package com.doan.WedResManage.Controller.DTO;

import com.doan.WedResManage.pojo.WeddingHall;

import java.util.List;

public class WeddingHallDetailsRequest {
    private WeddingHall weddingHall;
    private List<WeddingHallDetails> weddingHallDetails;

    public WeddingHall getWeddingHall() {
        return weddingHall;
    }

    public void setWeddingHall(WeddingHall weddingHall) {
        this.weddingHall = weddingHall;
    }

    public WeddingHallDetailsRequest(WeddingHall weddingHall, List<WeddingHallDetails> weddingHallDetails) {
        this.weddingHall = weddingHall;
        this.weddingHallDetails = weddingHallDetails;
    }

    public List<WeddingHallDetails> getWeddingHallDetails() {
        return weddingHallDetails;
    }

    public void setWeddingHallDetails(List<WeddingHallDetails> weddingHallDetails) {
        this.weddingHallDetails = weddingHallDetails;
    }

}
