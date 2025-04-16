import { Component, Input } from '@angular/core';
import { InfoJoComponent } from './info-jo/info-jo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [InfoJoComponent, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() dataHeader!: {
    entries?: number;
    medals?: number;
    athletes?: number;
    jos?: number;
    countries?: number;
  };
  @Input() title!: string;
  @Input() isDetails?: boolean;
  public joCount!: number;
  public countries!: string[];
}
