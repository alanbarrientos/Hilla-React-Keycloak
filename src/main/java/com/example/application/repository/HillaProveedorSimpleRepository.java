package com.example.application.repository;

import com.example.application.entity.ProveedorSimple;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HillaProveedorSimpleRepository extends JpaRepository<ProveedorSimple, Long>, JpaSpecificationExecutor<ProveedorSimple> {
    Page<ProveedorSimple> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
}
