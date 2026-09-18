import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Subject, catchError, of, startWith, switchMap } from 'rxjs';
import { ServidorResponse } from '../../../../dto/servidor.dto';
import { FeedbackService } from '../../../../services/feedback.service';
import { ServidorService } from '../../../../services/servidor.service';
import { LoadingBarComponent } from '../../../../shared/components/loading-bar/loading-bar';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { TableActionsComponent } from '../../../../shared/components/table-actions/table-actions';

@Component({
  selector: 'app-servidor-list',
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
  templateUrl: './servidor-list.html',
})
export class ServidorListComponent {
  private readonly servidorService = inject(ServidorService);
  private readonly feedback = inject(FeedbackService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);
  private readonly refresh$ = new Subject<void>();

  readonly loading$ = this.servidorService.loading$;
  readonly servidores$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() =>
      this.servidorService.listar().pipe(
        catchError((error: unknown) => {
          this.feedback.error(error, 'Erro ao carregar servidores');
          return of([]);
        }),
      ),
    ),
  );

  editar(servidor: ServidorResponse): void {
    this.router.navigate(['/servidores', servidor.id, 'editar']);
  }

  confirmarExclusao(servidor: ServidorResponse): void {
    this.confirmation.confirm({
      header: 'Excluir servidor',
      message: `Deseja excluir ${servidor.nome}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.excluir(servidor),
    });
  }

  private excluir(servidor: ServidorResponse): void {
    this.servidorService.excluir(servidor.id).subscribe({
      next: (response) => {
        this.feedback.success(response.message);
        this.refresh$.next();
      },
      error: (error: unknown) => this.feedback.error(error, 'Erro ao excluir servidor'),
    });
  }
}
