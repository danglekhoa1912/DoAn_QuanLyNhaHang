package com.doan.WedResManage.service.serviceImpl;

import com.doan.WedResManage.Controller.DTO.MailRs;
import com.doan.WedResManage.service.SendGridMailService;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.beans.propertyeditors.CustomBooleanEditor.VALUE_TRUE;

@Service
public class SendGridMailServiceImpl implements SendGridMailService {
    private static final String CONTENT_TYPE_TEXT_PLAIN = "text/plain";

    private static final String KEY_X_MOCK = "X-Mock";

    private static final String SEND_GRID_ENDPOINT_SEND_EMAIL = "mail/send";

    @Value("${send_grid.api_key}")
    private String sendGridApiKey;

    @Value("${send_grid.from_email}")
    private String sendGridFromEmail;

    @Value("${send_grid.from_name}")
    private String sendGridFromName;
    @Value("${send_grid.email_id}")
    private String idMail;

    @Override
    public void sendMail(String subject, List<String> sendToEmails, MailRs order) {
        Mail mail = buildMailToSend(subject, sendToEmails,order);
        send(mail);
    }

    private void send(Mail mail) {
        SendGrid sg = new SendGrid(sendGridApiKey);
        sg.addRequestHeader(KEY_X_MOCK, VALUE_TRUE);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint(SEND_GRID_ENDPOINT_SEND_EMAIL);
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    private Mail buildMailToSend(String subject, List<String> sendToEmails,MailRs mailRs) {
        Mail mail = new Mail();

        Email fromEmail = new Email();
        fromEmail.setName(sendGridFromName);
        fromEmail.setEmail(sendGridFromEmail);

        mail.setTemplateId(idMail);

        mail.setFrom(fromEmail);

        mail.setSubject(subject);

        Personalization personalization = new Personalization();

        //Add sendToEmails
        if (sendToEmails != null) {
            for (String email : sendToEmails) {
                Email to = new Email();
                to.setEmail(email);
                personalization.addTo(to);
            }
        }
        //personalization.addSubstitution("name",mailRs.getName());
        personalization.addDynamicTemplateData("name",mailRs.getName());
        personalization.addDynamicTemplateData("id",mailRs.getId());
        personalization.addDynamicTemplateData("hall",mailRs.getHall());
        personalization.addDynamicTemplateData("hallPrice",mailRs.getHallPrice());
        personalization.addDynamicTemplateData("servicePrice",mailRs.getServicePrice());
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date=simpleDateFormat.format(mailRs.getTime());
        personalization.addDynamicTemplateData("menuPrice",mailRs.getMenuPrice());
        personalization.addDynamicTemplateData("time",date);
        System.out.println(date);
        personalization.addDynamicTemplateData("mobile",mailRs.getMobile());
        personalization.addDynamicTemplateData("status",mailRs.getStatus());
        personalization.addDynamicTemplateData("count",mailRs.getCount());
        personalization.addDynamicTemplateData("total",mailRs.getTotal());
        mail.addPersonalization(personalization);

        return mail;
    }
}

