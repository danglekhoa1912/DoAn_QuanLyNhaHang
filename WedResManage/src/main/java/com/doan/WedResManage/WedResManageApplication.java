package com.doan.WedResManage;

import com.cloudinary.Cloudinary;
import com.cloudinary.SingletonManager;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication()

public class WedResManageApplication {

	public static void main(String[] args) {
		SpringApplication.run(WedResManageApplication.class, args);
	}
	@Bean
	public Cloudinary cloudinaryConfig() {
		Cloudinary cloudinary
				= new Cloudinary(ObjectUtils.asMap(
				"cloud_name", "giahuyoke",
				"api_key", "945566633459294",
				"api_secret", "yMGkFz65pgUmCK6h4-usAsgbqns",
				"secure", true));
		return cloudinary;
	}
}
