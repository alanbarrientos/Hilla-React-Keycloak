package com.example.application.services;

import com.example.application.entity.ProveedorSimple;
import com.example.application.repository.HillaProveedorSimpleRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.PermitAll;

@BrowserCallable
@PermitAll
public class HillaProveedorSimpleService extends CrudRepositoryService<ProveedorSimple, Long, HillaProveedorSimpleRepository> {

}
