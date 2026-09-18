import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { finalize } from 'rxjs';
import { SecretariaRequest } from '../../../../dto/secretaria.dto';
import { FeedbackService } from '../../../../services/feedback.service';
import { SecretariaService } from '../../../../services/secretaria.service';
import { FieldErrorComponent } from '../../../../shared/components/field-error/field-error';
import { LoadingBarComponent } from '../../../../shared/components/loading-bar/loading-bar';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-secretaria-form',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    CardModule,
    InputTextModule,
    PageHeaderComponent,
    LoadingBarComponent,
    FieldErrorComponent,
  ],
  templateUrl: './secretaria-form.html',
})
export class SecretariaFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly secretariaService = inject(SecretariaService);
  private readonly feedback = inject(FeedbackService);

  readonly loading$ = this.secretariaService.loading$;
  readonly form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    sigla: ['', [Validators.required, Validators.maxLength(20)]],
  });

  submitted = false;
  saving = false;
  private secretariaId: string | null = null;

  get isEditing(): boolean {
    return this.secretariaId !== null;
  }

  ngOnInit(): void {
    this.secretariaId = this.route.snapshot.paramMap.get('id');

    if (this.secretariaId) {
      this.secretariaService.buscarPorId(this.secretariaId).subscribe({
        next: (secretaria) => this.form.patchValue(secretaria),
        error: (error: unknown) => {
          this.feedback.error(error, 'Erro ao carregar secretaria');
          this.router.navigate(['/secretarias']);
        },
      });
    }
  }

  salvar(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: SecretariaRequest = this.form.getRawValue();
    const operation$ = this.secretariaId
      ? this.secretariaService.atualizar(this.secretariaId, request)
      : this.secretariaService.criar(request);

    this.saving = true;
    operation$.pipe(finalize(() => (this.saving = false))).subscribe({
      next: (response) => {
        this.feedback.success(response.message);
        this.router.navigate(['/secretarias']);
      },
      error: (error: unknown) => this.feedback.error(error, 'Erro ao salvar secretaria'),
    });
  }
}
