package com.municipio.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.municipio.backend.model.Servidor;

public interface ServidorRepo extends JpaRepository<Servidor, UUID> {
    public boolean existsByEmailIgnoreCase(String email);

    public boolean existsBySecretaria_Uuid(UUID secretariaId);
}
