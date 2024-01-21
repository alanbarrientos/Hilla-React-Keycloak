package com.example.application.services;

import com.example.application.entity.Image;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class ImageService {
    @Autowired
    private Image image;
    public void saveImage(Image image) {
        image.setImageBase64(image.getImageBase64());
    }
    public Image getImage() {
        return image;
    }

}
