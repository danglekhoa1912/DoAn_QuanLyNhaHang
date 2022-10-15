package com.doan.WedResManage.Response;

import lombok.Data;

@Data
public class BadLoginResponse {
    private String statuscode;
    private String message;
    public BadLoginResponse(String stt,String ms){
        this.statuscode=stt;
        this.message=ms;
    }
}
