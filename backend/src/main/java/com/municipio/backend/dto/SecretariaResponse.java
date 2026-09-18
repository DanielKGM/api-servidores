package com.municipio.backend.dto;

import java.time.Instant;
import java.util.UUID;

import com.municipio.backend.model.Secretaria;

public record SecretariaResponse(
        UUID id,
        String nome,
        String sigla,
        Instant createdAt,
        Instant updatedAt) {

    public static SecretariaResponse deEntidade(Secretaria secretaria) {
        return new SecretariaResponse(
                secretaria.getUuid(),
                secretaria.getNome(),
                secretaria.getSigla(),
                secretaria.getCreatedAt(),
                secretaria.getUpdatedAt());
    }
}