import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-loading-bar',
  imports: [ProgressBarModule],
  templateUrl: './loading-bar.html',
  styleUrl: './loading-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBarComponent {
  readonly loading = input<boolean | null>(false);
}
