package com.doan.WedResManage.Controller.DTO;

import com.doan.WedResManage.pojo.WeddingHall;

import java.util.List;

public class WeddingHallDetailsRequest {
    private WeddingHall id;
    private List<WeddingHallDetails> weddingHallDetails;

    public WeddingHall getId() {
        return id;
    }

    public void setId(WeddingHall id) {
        this.id = id;
    }

    public WeddingHallDetailsRequest(WeddingHall id, List<WeddingHallDetails> weddingHallDetails) {
        this.id = id;
        this.weddingHallDetails = weddingHallDetails;
    }

    public List<WeddingHallDetails> getWeddingHallDetails() {
        return weddingHallDetails;
    }

    public void setWeddingHallDetails(List<WeddingHallDetails> weddingHallDetails) {
        this.weddingHallDetails = weddingHallDetails;
    }

}
