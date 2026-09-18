import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Subject, catchError, of, startWith, switchMap } from 'rxjs';
import { SecretariaResponse } from '../../../../dto/secretaria.dto';
import { FeedbackService } from '../../../../services/feedback.service';
import { SecretariaService } from '../../../../services/secretaria.service';
import { LoadingBarComponent } from '../../../../shared/components/loading-bar/loading-bar';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { TableActionsComponent } from '../../../../shared/components/table-actions/table-actions';

@Component({
  selector: 'app-secretaria-list',
  imports: [
    AsyncPipe,
    DatePipe,
    CardModule,
    TableModule,
    TagModule,
    PageHeaderComponent,
    LoadingBarComponent,
    TableActionsComponent,
  ],
  templateUrl: './secretaria-list.html',
})
export class SecretariaListComponent {
  private readonly secretariaService = inject(SecretariaService);
  private readonly feedback = inject(FeedbackService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);
  private readonly refresh$ = new Subject<void>();

  readonly loading$ = this.secretariaService.loading$;
  readonly secretarias$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() =>
      this.secretariaService.listar().pipe(
        catchError((error: unknown) => {
          this.feedback.error(error, 'Erro ao carregar secretarias');
          return of([]);
        }),
      ),
    ),
  );

  editar(secretaria: SecretariaResponse): void {
    this.router.navigate(['/secretarias', secretaria.id, 'editar']);
  }

  confirmarExclusao(secretaria: SecretariaResponse): void {
    this.confirmation.confirm({
      header: 'Excluir secretaria',
      message: `Deseja excluir ${secretaria.nome}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.excluir(secretaria),
    });
  }

  private excluir(secretaria: SecretariaResponse): void {
    this.secretariaService.excluir(secretaria.id).subscribe({
      next: (response) => {
        this.feedback.success(response.message);
        this.refresh$.next();
      },
      error: (error: unknown) => this.feedback.error(error, 'Erro ao excluir secretaria'),
    });
  }
}
