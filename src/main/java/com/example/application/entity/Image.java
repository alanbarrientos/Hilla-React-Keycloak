package com.example.application.entity;

import org.springframework.stereotype.Component;

@Component
public class Image {
    private String imageBase64 = "";

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
}
