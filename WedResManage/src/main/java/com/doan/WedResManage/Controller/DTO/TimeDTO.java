package com.doan.WedResManage.Controller.DTO;

import lombok.Data;

import java.time.Instant;

@Data
public class TimeDTO {
    private Instant date;
    private int time;
}
