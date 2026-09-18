package com.municipio.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "servidor")
@Getter
@Setter
@Builder
public class Servidor extends EntidadeAuditavel {
    @Column(nullable = false, unique = true, length = 30)
    private String matricula;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false)
    private LocalDate dataNascimento;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "secretaria_id", nullable = false)
    private Secretaria secretaria;
}
