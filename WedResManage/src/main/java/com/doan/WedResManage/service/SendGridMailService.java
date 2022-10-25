package com.doan.WedResManage.service;

import com.doan.WedResManage.Controller.DTO.MailRs;

import java.util.List;

public interface SendGridMailService {
    void sendMail(String subject, List<String> sendToEmails, MailRs order);
}
