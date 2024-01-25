package com.example.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.hilla.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

@Entity
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String nombreEncargadoGeneral;
    private int cantidadSucursales;
    private Boolean active;
    //    @NotNull

    @JsonIgnore
    private LocalDate dateAdded;

    private LocalDate fechaDeFundacionDelProveedor;

    @Version
    @Nullable
    private long version;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNombreEncargadoGeneral() {
        return nombreEncargadoGeneral;
    }

    public void setNombreEncargadoGeneral(String nombreEncargadoGeneral) {
        this.nombreEncargadoGeneral = nombreEncargadoGeneral;
    }

    public int getCantidadSucursales() {
        return cantidadSucursales;
    }

    public void setCantidadSucursales(int cantidadSucursales) {
        this.cantidadSucursales = cantidadSucursales;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public LocalDate getFechaDeFundacionDelProveedor() {
        return fechaDeFundacionDelProveedor;
    }

    public void setFechaDeFundacionDelProveedor(LocalDate fechaDeFundacionDelProveedor) {
        this.fechaDeFundacionDelProveedor = fechaDeFundacionDelProveedor;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}
