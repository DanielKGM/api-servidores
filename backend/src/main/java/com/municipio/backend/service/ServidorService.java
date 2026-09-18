package com.municipio.backend.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.municipio.backend.dto.ServidorRequest;
import com.municipio.backend.dto.ServidorResponse;
import com.municipio.backend.exception.BusinessRuleException;
import com.municipio.backend.exception.ConflictException;
import com.municipio.backend.exception.ResourceNotFoundException;
import com.municipio.backend.model.Secretaria;
import com.municipio.backend.model.Servidor;
import com.municipio.backend.repository.SecretariaRepo;
import com.municipio.backend.repository.ServidorRepo;

@Service
public class ServidorService {
    private final ServidorRepo servidorRepository;
    private final SecretariaRepo secretariaRepository;

    public ServidorService(
            ServidorRepo servidorRepository,
            SecretariaRepo secretariaRepository) {
        this.servidorRepository = servidorRepository;
        this.secretariaRepository = secretariaRepository;
    }

    @Transactional(readOnly = true)
    public List<ServidorResponse> listar() {
        return servidorRepository.findAll()
                .stream()
                .map(ServidorResponse::deEntidade)
                .toList();
    }

    @Transactional(readOnly = true)
    public ServidorResponse buscarPorId(UUID id) {
        Servidor servidor = servidorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servidor nao encontrado."));

        return ServidorResponse.deEntidade(servidor);
    }

    @Transactional
    public ServidorResponse criar(ServidorRequest request) {
        validarIdade(request.dataNascimento());

        if (servidorRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ConflictException("Ja existe um servidor com esse e-mail.");
        }

        Secretaria secretaria = secretariaRepository.findById(request.secretariaId())
                .orElseThrow(() -> new ResourceNotFoundException("Secretaria nao encontrada."));

        Servidor servidor = request.paraEntidade(secretaria);
        Servidor salvo = servidorRepository.save(servidor);

        return ServidorResponse.deEntidade(salvo);
    }

    @Transactional
    public ServidorResponse atualizar(UUID id, ServidorRequest request) {
        validarIdade(request.dataNascimento());

        Servidor servidor = servidorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servidor nao encontrado."));

        if (servidorRepository.existsByEmailIgnoreCaseAndUuidNot(request.email(), id)) {
            throw new ConflictException("Ja existe um servidor com esse e-mail.");
        }

        Secretaria secretaria = secretariaRepository.findById(request.secretariaId())
                .orElseThrow(() -> new ResourceNotFoundException("Secretaria nao encontrada."));

        servidor.setNome(request.nome());
        servidor.setEmail(request.email());
        servidor.setDataNascimento(request.dataNascimento());
        servidor.setSecretaria(secretaria);

        Servidor atualizado = servidorRepository.save(servidor);
        return ServidorResponse.deEntidade(atualizado);
    }

    @Transactional
    public void excluir(UUID id) {
        if (!servidorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Servidor nao encontrado.");
        }

        servidorRepository.deleteById(id);
    }

    private void validarIdade(LocalDate dataNascimento) {
        int idade = Period.between(
                dataNascimento,
                LocalDate.now(ZoneId.of("America/Sao_Paulo"))).getYears();

        if (idade < 18 || idade > 75) {
            throw new BusinessRuleException("O servidor deve ter entre 18 e 75 anos.");
        }
    }
}
