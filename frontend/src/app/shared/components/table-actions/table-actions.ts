import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-table-actions',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './table-actions.html',
  styleUrl: './table-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionsComponent {
  readonly edit = output<void>();
  readonly remove = output<void>();
}
