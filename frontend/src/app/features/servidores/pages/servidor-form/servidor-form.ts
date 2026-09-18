import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { combineLatest, finalize, map } from 'rxjs';
import { SecretariaResponse } from '../../../../dto/secretaria.dto';
import { ServidorRequest } from '../../../../dto/servidor.dto';
import { FeedbackService } from '../../../../services/feedback.service';
import { SecretariaService } from '../../../../services/secretaria.service';
import { ServidorService } from '../../../../services/servidor.service';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error';
import { LoadingBarComponent } from '../../../../shared/components/loading-bar/loading-bar';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-servidor-form',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    CardModule,
    InputTextModule,
    SelectModule,
    PageHeaderComponent,
    LoadingBarComponent,
    FieldErrorComponent,
  ],
  templateUrl: './servidor-form.html',
})
export class ServidorFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly servidorService = inject(ServidorService);
  private readonly secretariaService = inject(SecretariaService);
  private readonly feedback = inject(FeedbackService);

  readonly loading$ = combineLatest([
    this.servidorService.loading$,
    this.secretariaService.loading$,
  ]).pipe(map(([servidorLoading, secretariaLoading]) => servidorLoading || secretariaLoading));

  readonly form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    dataNascimento: ['', [Validators.required]],
    secretariaId: ['', [Validators.required]],
  });

  secretarias: SecretariaResponse[] = [];
  submitted = false;
  saving = false;
  private servidorId: string | null = null;

  get isEditing(): boolean {
    return this.servidorId !== null;
  }

  ngOnInit(): void {
    this.carregarSecretarias();
    this.servidorId = this.route.snapshot.paramMap.get('id');

    if (this.servidorId) {
      this.carregarServidor(this.servidorId);
    }
  }

  salvar(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: ServidorRequest = this.form.getRawValue();
    const operation$ = this.servidorId
      ? this.servidorService.atualizar(this.servidorId, request)
      : this.servidorService.criar(request);

    this.saving = true;
    operation$.pipe(finalize(() => (this.saving = false))).subscribe({
      next: (response) => {
        this.feedback.success(response.message);
        this.router.navigate(['/servidores']);
      },
      error: (error: unknown) => this.feedback.error(error, 'Erro ao salvar servidor'),
    });
  }

  private carregarSecretarias(): void {
    this.secretariaService.listar().subscribe({
      next: (secretarias) => (this.secretarias = secretarias),
      error: (error: unknown) => this.feedback.error(error, 'Erro ao carregar secretarias'),
    });
  }

  private carregarServidor(id: string): void {
    this.servidorService.buscarPorId(id).subscribe({
      next: (servidor) => this.form.patchValue(servidor),
      error: (error: unknown) => {
        this.feedback.error(error, 'Erro ao carregar servidor');
        this.router.navigate(['/servidores']);
      },
    });
  }
}
