package com.example.application.services;

//import com.example.application.entity.Filter;
import com.example.application.entity.Proveedor;
import com.example.application.repository.AlanProveedorRepository;
import com.example.application.repository.ProveedorRepository;
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
import java.util.stream.Collectors;

@Endpoint
@PermitAll
public class ProveedorService {
    @Autowired
    ProveedorRepository proveedorRepository;
    @Autowired
    AlanProveedorRepository alanProveedorRepository;
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
//    public PageResponse list(Pageable pageable, @Nullable Filter[] filter) {
////        Specification<Proveedor> specs = toSpec(filter);
//        if(filter.length == 0){
//            Page<Proveedor> page = alanProveedorRepository.findAll(
//                    "",
//                    pageable.getSort().stream()
//                            .map(order -> {return order.getProperty()+ order.getDirection();})
//                            .collect(Collectors.joining(",")));,
//                    pageable.getOffset(),
//                    pageable.getPageNumber()
//            return new PageResponse(page.toList(), page.getTotalElements());
//        }else{
//            Page<Proveedor> page = alanProveedorRepository.findAll(pageable);
//            return new PageResponse(page.toList(), page.getTotalElements());
//        }
//    }
    public PageResponse list(Pageable pageable, @Nullable Filter filter) {
        Specification<Proveedor> specs = toSpec(filter);
        Page<Proveedor> page = proveedorRepository.findAll(specs, pageable);
        return new PageResponse(page.toList(), page.getTotalElements());
    }

    public PageResponse listByName(Pageable pageable, String name){
        Page<Proveedor> page = proveedorRepository.findAllByNameContainingIgnoreCase(name, pageable);
        return new PageResponse(page.toList(), page.getTotalElements());
    }

    public Proveedor getById(Long id){
        return proveedorRepository.findById(id).get();
    }


//public PageResponse list(Pageable pageable, @Nullable Filter filters) {
//        Specification<Proveedor> specs = toSpec(filter);
//        if(selfFilters.length == 0){
//            Page<Proveedor> page = proveedorRepository.findAll(pageable);
//            return new PageResponse(page.toList(), page.getTotalElements());
//        }else{
//            Page<Proveedor> page = proveedorRepository.findAll(pageable);
//            return new PageResponse(page.toList(), page.getTotalElements());
//        }
//    }
    public  PageResponse getProveedores(int page, int pageSize, Sort sort, String searchTerm){
        var res = proveedorRepository.findAll(PageRequest.of(page, pageSize));
        return new PageResponse(res.getContent(), res.getTotalElements());
    }
    protected Specification<Proveedor> toSpec(@Nullable Filter filter) {
        return this.jpaFilterConverter.toSpec(filter, Proveedor.class);
    }
    public void saveProveedor(Proveedor proveedor){
        proveedor.setDateAdded(LocalDate.now());
        proveedorRepository.save(proveedor);
    }
}


