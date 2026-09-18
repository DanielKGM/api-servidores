package com.municipio.backend.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import com.municipio.backend.model.Servidor;

public record ServidorResponse(
                UUID id,
                String matricula,
                String nome,
                String email,
                LocalDate dataNascimento,

                UUID secretariaId,
                String secretariaNome,
                String secretariaSigla,

                Instant createdAt,
                Instant updatedAt) {

        public static ServidorResponse deEntidade(Servidor servidor) {

                return new ServidorResponse(
                                servidor.getUuid(),
                                servidor.getMatricula(),
                                servidor.getNome(),
                                servidor.getEmail(),
                                servidor.getDataNascimento(),
                                servidor.getSecretaria().getUuid(),
                                servidor.getSecretaria().getNome(),
                                servidor.getSecretaria().getSigla(),
                                servidor.getCreatedAt(),
                                servidor.getUpdatedAt());
        }
}