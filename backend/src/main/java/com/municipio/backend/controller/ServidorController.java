package com.municipio.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.municipio.backend.dto.ServidorRequest;
import com.municipio.backend.dto.ServidorResponse;
import com.municipio.backend.service.ServidorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/servidores")
public class ServidorController {

    private final ServidorService service;

    public ServidorController(ServidorService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ServidorResponse>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServidorResponse> buscarPorId(
            @PathVariable UUID id) {

        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ServidorResponse> criar(
            @Valid @RequestBody ServidorRequest request) {

        ServidorResponse response = service.criar(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServidorResponse> atualizar(
            @PathVariable UUID id,
            @Valid @RequestBody ServidorRequest request) {

        return ResponseEntity.ok(
                service.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable UUID id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}