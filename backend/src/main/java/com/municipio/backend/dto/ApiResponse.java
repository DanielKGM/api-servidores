package com.municipio.backend.dto;

public record ApiResponse<T>(
        String message,
        T data) {
}
