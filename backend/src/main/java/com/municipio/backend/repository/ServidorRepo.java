package com.municipio.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.municipio.backend.model.Servidor;

public interface ServidorRepo extends JpaRepository<Servidor, UUID> {
    public boolean existsByMatricula(String matricula);

    public boolean existsByEmailIgnoreCase(String email);

    public boolean existsBySecretariaId(UUID secretariaId);
}