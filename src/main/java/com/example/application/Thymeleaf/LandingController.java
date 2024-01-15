package com.example.application.Thymeleaf;

import jakarta.annotation.security.PermitAll;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@PermitAll
public class LandingController {
    @GetMapping("/")
    public String landing(Model model) {
        return "landing";
    }

}
