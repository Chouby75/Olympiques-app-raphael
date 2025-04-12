import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-jo',
  standalone: true,
  imports: [],
  templateUrl: './info-jo.component.html',
  styleUrl: './info-jo.component.scss',
})
export class InfoJoComponent {
  @Input() label!: string;
  @Input() value!: string;
}
