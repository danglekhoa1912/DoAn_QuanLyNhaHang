package com.doan.WedResManage.Controller;

import com.doan.WedResManage.Response.ImageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ImageController {
    @GetMapping("/image")
    public ResponseEntity<byte[]> getImage(@RequestParam("url") String url) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.getForEntity(url, byte[].class);
        byte[] imageBytes = response.getBody();
        return new ImageResponse().ImageResponse((imageBytes));
    }
}