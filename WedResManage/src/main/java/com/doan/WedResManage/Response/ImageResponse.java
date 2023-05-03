package com.doan.WedResManage.Response;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ImageResponse {
    public ResponseEntity<byte[]> ImageResponse(byte[] imageBytes){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(imageBytes.length);
        return new ResponseEntity<byte[]>(imageBytes, headers, HttpStatus.OK);
    }
}
