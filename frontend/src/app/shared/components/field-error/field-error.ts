import { AbstractControl } from '@angular/forms';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.html',
  styleUrl: './field-error.scss',
})
export class FieldErrorComponent {
  readonly control = input<AbstractControl | null>(null);
  readonly submitted = input(false);

  get visible(): boolean {
    const control = this.control();
    return Boolean(control?.invalid && (control.touched || this.submitted()));
  }

  get message(): string {
    const errors = this.control()?.errors;

    if (errors?.['required']) {
      return 'Campo obrigatorio.';
    }

    if (errors?.['email']) {
      return 'Informe um e-mail valido.';
    }

    if (errors?.['maxlength']) {
      return `Limite de ${errors['maxlength'].requiredLength} caracteres.`;
    }

    return 'Valor invalido.';
  }
}
