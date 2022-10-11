package com.doan.WedResManage.service;

import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    String uploadImg(MultipartFile file, Cloudinary cloudinary);
    String updateImg(MultipartFile file, Cloudinary cloudinary);
}
