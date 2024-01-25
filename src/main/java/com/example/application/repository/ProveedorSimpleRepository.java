package com.example.application.repository;

import com.example.application.entity.ProveedorSimple;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProveedorSimpleRepository extends CrudRepository<ProveedorSimple, Long> {
    @Query(value = "SELECT * FROM Proveedor p WHERE :filter ORDER BY :orderby limit :limit offset :offset", nativeQuery = true)
    Iterable<ProveedorSimple> findAll(@Param("filter") String filter, @Param("orderby") String orderby, @Param("limit") String limit, @Param("offset") String offset);


}
