package com.example.application.repository;

import com.example.application.entity.Proveedor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

public interface AlanProveedorRepository extends CrudRepository<Proveedor, Long> {
    @Query(value = "SELECT * FROM Proveedor p WHERE :filter ORDER BY :orderby limit :limit offset :offset", nativeQuery = true)
    Iterable<Proveedor> findAll( @Param("filter") String filter, @Param("orderby") String orderby, @Param("limit") String limit, @Param("offset") String offset);


}
