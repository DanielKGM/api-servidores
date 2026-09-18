package com.municipio.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.municipio.backend.model.Secretaria;

public interface SecretariaRepo extends JpaRepository<Secretaria, UUID> {
    boolean existsBySiglaIgnoreCase(String sigla);

    boolean existsBySiglaIgnoreCaseAndUuidNot(String sigla, UUID uuid);
}
