package com.example.application.repository;

import com.example.application.entity.Proveedor;
import com.example.application.entity.ProveedorSimple;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Map;
import java.util.Random;

@Component
public class DatabaseFiller {
    @Autowired
    HillaProveedorSimpleRepository hillaProveedorSimpleRepository;

    @Autowired
    ProveedorRepository proveedorRepository;
    RestTemplate restTemplate = new RestTemplate();

    Random random = new Random();
    private final int cantidadACrear = 1000;
    @PostConstruct
    void init(){
//        String fooResourceUrl = "https://dummyjson.com/users";
//        ResponseEntity<String> response = restTemplate.getForEntity(fooResourceUrl , String.class);
//        JsonParser springParser = JsonParserFactory.getJsonParser();
//        Map< String, Object > map = springParser.parseMap(response.getBody());
//        String[] mapArray = new String[map.size()];
//        mapArrayp

        for (int i = 1; i<=cantidadACrear; i++){
            ProveedorSimple proveedorSimple = new ProveedorSimple();
            proveedorSimple.setActive(random.nextBoolean());
            proveedorSimple.setName("Proveedor " + random.nextInt(1000));
            proveedorSimple.setDateAdded(LocalDate.now().minusMonths(random.nextInt(40)));
            hillaProveedorSimpleRepository.save(proveedorSimple);
        }
        for (int i = 1; i<=cantidadACrear; i++){
            Proveedor proveedor = new Proveedor();
            proveedor.setActive(random.nextBoolean());
            proveedor.setName("Proveedor " + random.nextInt(1000));
            proveedor.setCantidadSucursales(random.nextInt(20));
            proveedor.setNombreEncargadoGeneral("Encargado " + random.nextInt(1000));
            proveedor.setDateAdded(LocalDate.now().minusMonths(random.nextInt(40)));
            proveedor.setFechaDeFundacionDelProveedor(LocalDate.now().minusMonths(random.nextInt(40)));
            proveedorRepository.save(proveedor);
        }
    }
}
