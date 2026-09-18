package com.municipio.backend.dto;

import com.municipio.backend.model.Secretaria;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SecretariaRequest(
                @NotBlank(message = "Nome é obrigatório") @Size(max = 150, message = "Nome deve ter no máximo 150 caracteres") String nome,

                @NotBlank(message = "Sigla é obrigatória") @Size(max = 20, message = "Sigla deve ter no máximo 20 caracteres") String sigla

) {
        public Secretaria toEntity() {
                return Secretaria.builder()
                                .nome(nome)
                                .sigla(sigla)
                                .build();
        }
}