package com.municipio.backend.dto;

import java.time.LocalDate;
import java.util.UUID;

import com.municipio.backend.model.Secretaria;
import com.municipio.backend.model.Servidor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ServidorRequest(

                @NotBlank(message = "Matrícula é obrigatória") @Size(max = 30, message = "Matrícula deve ter no máximo 30 caracteres") String matricula,

                @NotBlank(message = "Nome é obrigatório") @Size(max = 150, message = "Nome deve ter no máximo 150 caracteres") String nome,

                @NotBlank(message = "E-mail é obrigatório") @Email(message = "E-mail inválido") @Size(max = 150, message = "E-mail deve ter no máximo 150 caracteres") String email,

                @NotNull(message = "Data de nascimento é obrigatória") LocalDate dataNascimento,

                @NotNull(message = "Secretaria é obrigatória") UUID secretariaId

) {
        public Servidor toEntity(Secretaria secretaria) {
                return Servidor.builder()
                                .matricula(matricula)
                                .nome(nome)
                                .email(email)
                                .dataNascimento(dataNascimento)
                                .secretaria(secretaria)
                                .build();
        }
}