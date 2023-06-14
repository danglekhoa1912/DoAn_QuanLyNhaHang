package com.doan.WedResManage.Controller.DTO;

import lombok.Data;

@Data
public class PaymentRequest {
    int id;
    String transId;
    int status;
    String typePay;
}
