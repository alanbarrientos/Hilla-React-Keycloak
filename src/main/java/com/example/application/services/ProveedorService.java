package com.example.application.services;

import com.example.application.entity.Proveedor;
import com.example.application.repository.ProveedorRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudRepositoryService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import dev.hilla.mappedtypes.Sort;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Endpoint
@PermitAll
public class ProveedorService extends CrudRepositoryService<Proveedor, Long, ProveedorRepository> {
    @Autowired
    ProveedorRepository proveedorRepository;
    @Autowired
    private JpaFilterConverter jpaFilterConverter;
    public List<Proveedor> listAll(){
        return proveedorRepository.findAll();
    }

    public record PageResponse(
            List<Proveedor> items,
            long totalCount
    ){
    }
//    public PageResponse list(Pageable pageable, @Nullable Filter filter) {
//        Specification<Proveedor> specs = toSpec(filter);
//        Page<Proveedor> page = proveedorRepository.findAll(specs, pageable);
//        return new PageResponse(page.toList(), page.getTotalElements());
//    }

    public PageResponse listByName(Pageable pageable, String name){
        Page<Proveedor> page = proveedorRepository.findAllByNameContainingIgnoreCase(name, pageable);
        return new PageResponse(page.toList(), page.getTotalElements());
    }

    public Proveedor getById(Long id){
        return proveedorRepository.findById(id).get();
    }


    public PageResponse getProveedores(int page, int pageSize, Sort sort, String searchTerm){
        var res = proveedorRepository.findAll(PageRequest.of(page, pageSize));
        return new PageResponse(res.getContent(), res.getTotalElements());
    }
    protected Specification<Proveedor> toSpec(@Nullable Filter filter) {
        return this.jpaFilterConverter.toSpec(filter, Proveedor.class);
    }
    public void createProveedor(Proveedor proveedor){
        proveedor.setDateAdded(LocalDate.now());
        proveedorRepository.save(proveedor);
    }
}
