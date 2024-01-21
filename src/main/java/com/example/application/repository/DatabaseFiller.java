package com.example.application.repository;

import com.example.application.entity.Proveedor;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Random;

@Component
public class DatabaseFiller {
    @Autowired
    ProveedorRepository proveedorRepository;

    Random random = new Random();
    private final int cantidadACrear = 1000;
    @PostConstruct
    void init(){
        for (int i = 1; i<=cantidadACrear; i++){
            Proveedor proveedor = new Proveedor();
            proveedor.setActive(random.nextBoolean());
            proveedor.setName("Proveedor " + random.nextInt(1000));
            proveedor.setDateAdded(LocalDate.now().minusMonths(random.nextInt(40)));
            proveedorRepository.save(proveedor);
        }
    }
}
