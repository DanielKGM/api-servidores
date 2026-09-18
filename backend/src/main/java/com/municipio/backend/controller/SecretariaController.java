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

import com.municipio.backend.dto.ApiResponse;
import com.municipio.backend.dto.SecretariaRequest;
import com.municipio.backend.dto.SecretariaResponse;
import com.municipio.backend.service.SecretariaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/secretarias")
public class SecretariaController {

    private final SecretariaService service;

    public SecretariaController(SecretariaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SecretariaResponse>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SecretariaResponse> buscarPorId(
            @PathVariable UUID id) {

        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SecretariaResponse>> criar(
            @Valid @RequestBody SecretariaRequest request) {

        SecretariaResponse response = service.criar(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Secretaria criada com sucesso.", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SecretariaResponse>> atualizar(
            @PathVariable UUID id,
            @Valid @RequestBody SecretariaRequest request) {

        SecretariaResponse response = service.atualizar(id, request);
        return ResponseEntity.ok(new ApiResponse<>("Secretaria atualizada com sucesso.", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> excluir(
            @PathVariable UUID id) {

        service.excluir(id);

        return ResponseEntity.ok(new ApiResponse<>("Secretaria excluida com sucesso.", null));
    }
}
