package com.municipio.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.municipio.backend.dto.SecretariaRequest;
import com.municipio.backend.dto.SecretariaResponse;
import com.municipio.backend.exception.ConflictException;
import com.municipio.backend.exception.ResourceNotFoundException;
import com.municipio.backend.model.Secretaria;
import com.municipio.backend.repository.SecretariaRepo;
import com.municipio.backend.repository.ServidorRepo;

@Service
public class SecretariaService {
    private final SecretariaRepo secretariaRepository;
    private final ServidorRepo servidorRepository;

    public SecretariaService(SecretariaRepo secretariaRepository, ServidorRepo servidorRepository) {
        this.secretariaRepository = secretariaRepository;
        this.servidorRepository = servidorRepository;
    }

    @Transactional(readOnly = true)
    public List<SecretariaResponse> listar() {
        return secretariaRepository.findAll()
                .stream()
                .map(SecretariaResponse::deEntidade)
                .toList();
    }

    @Transactional(readOnly = true)
    public SecretariaResponse buscarPorId(UUID id) {
        Secretaria secretaria = secretariaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Secretaria nao encontrada."));

        return SecretariaResponse.deEntidade(secretaria);
    }

    @Transactional
    public SecretariaResponse criar(SecretariaRequest request) {
        if (secretariaRepository.existsBySiglaIgnoreCase(request.sigla())) {
            throw new ConflictException("Ja existe uma secretaria com essa sigla.");
        }

        Secretaria secretaria = request.paraEntidade();
        Secretaria salva = secretariaRepository.save(secretaria);

        return SecretariaResponse.deEntidade(salva);
    }

    @Transactional
    public SecretariaResponse atualizar(UUID id, SecretariaRequest request) {
        Secretaria secretaria = secretariaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Secretaria nao encontrada."));

        if (secretariaRepository.existsBySiglaIgnoreCaseAndUuidNot(request.sigla(), id)) {
            throw new ConflictException("Ja existe uma secretaria com essa sigla.");
        }

        secretaria.setNome(request.nome());
        secretaria.setSigla(request.sigla());

        Secretaria atualizada = secretariaRepository.save(secretaria);
        return SecretariaResponse.deEntidade(atualizada);
    }

    @Transactional
    public void excluir(UUID id) {
        if (!secretariaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Secretaria nao encontrada.");
        }

        if (servidorRepository.existsBySecretaria_Uuid(id)) {
            throw new ConflictException(
                    "Nao e possivel excluir a secretaria, pois existem servidores vinculados a ela.");
        }

        secretariaRepository.deleteById(id);
    }
}
