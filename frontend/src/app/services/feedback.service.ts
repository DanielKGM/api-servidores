import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly messageService = inject(MessageService);

  success(message: string): void {
    this.show('success', 'Sucesso', message);
  }

  info(summary: string, detail?: string): void {
    this.show('info', summary, detail);
  }

  warn(summary: string, detail?: string): void {
    this.show('warn', summary, detail);
  }

  error(error: unknown, summary = 'Erro'): void {
    this.show('error', summary, this.extractMessage(error));
  }

  private show(severity: ToastSeverity, summary: string, detail?: string): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 4500,
    });
  }

  private extractMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return this.extractBodyMessage(error.error) ?? error.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Nao foi possivel concluir a operacao.';
  }

  private extractBodyMessage(body: unknown): string | null {
    if (typeof body === 'string' && body.trim()) {
      return body;
    }

    if (Array.isArray(body)) {
      return body.map(String).join(', ');
    }

    if (!this.isRecord(body)) {
      return null;
    }

    const errors = body['errors'];
    if (Array.isArray(errors)) {
      const messages = errors.map(String).filter(Boolean);
      if (messages.length) {
        return messages.join(', ');
      }
    }

    if (this.isRecord(errors)) {
      const messages = Object.values(errors).flat().map(String).filter(Boolean);
      if (messages.length) {
        return messages.join(', ');
      }
    }

    const directMessage = body['message'] ?? body['detail'] ?? body['title'];
    if (typeof directMessage === 'string' && directMessage.trim()) {
      return directMessage;
    }

    return null;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object';
  }
}
