package com.example.application.services;

//import com.example.application.entity.Filter;
import com.example.application.entity.ProveedorSimple;
import com.example.application.repository.ProveedorSimpleRepository;
import com.example.application.repository.HillaProveedorSimpleRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nullable;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import dev.hilla.mappedtypes.Sort;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

@Endpoint
@PermitAll
public class ProveedorSimpleService {
    @Autowired
    HillaProveedorSimpleRepository hillaProveedorSimpleRepository;
    @Autowired
    ProveedorSimpleRepository proveedorRepository;
    @Autowired
    private JpaFilterConverter jpaFilterConverter;
    public List<ProveedorSimple> listAll(){
        return hillaProveedorSimpleRepository.findAll();
    }

    public record PageResponse(
            List<ProveedorSimple> items,
            long totalCount
    ){
    }

    public PageResponse list(Pageable pageable, @Nullable Filter filter) {
        Specification<ProveedorSimple> specs = toSpec(filter);
        Page<ProveedorSimple> page = hillaProveedorSimpleRepository.findAll(specs, pageable);
        return new PageResponse(page.toList(), page.getTotalElements());
    }

    public PageResponse listByName(Pageable pageable, String name){
        Page<ProveedorSimple> page = hillaProveedorSimpleRepository.findAllByNameContainingIgnoreCase(name, pageable);
        return new PageResponse(page.toList(), page.getTotalElements());
    }

    public ProveedorSimple getById(Long id){
        return hillaProveedorSimpleRepository.findById(id).get();
    }


    public  PageResponse getProveedores(int page, int pageSize, Sort sort, String searchTerm){
        var res = hillaProveedorSimpleRepository.findAll(PageRequest.of(page, pageSize));
        return new PageResponse(res.getContent(), res.getTotalElements());
    }
    protected Specification<ProveedorSimple> toSpec(@Nullable Filter filter) {
        return this.jpaFilterConverter.toSpec(filter, ProveedorSimple.class);
    }
    public void saveProveedor(ProveedorSimple proveedorSimple){
        proveedorSimple.setDateAdded(LocalDate.now());
        hillaProveedorSimpleRepository.save(proveedorSimple);
    }
}


