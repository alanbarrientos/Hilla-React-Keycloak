package com.example.application.services;

import com.example.application.entity.Proveedor;
import com.example.application.repository.ProveedorRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class HillaProveedorService extends CrudRepositoryService<Proveedor, Long, ProveedorRepository> {

}
