import { Component } from '@angular/core';
import { InfoJoComponent } from './info-jo/info-jo.component';

@Component({
  selector: 'app-header',
  imports: [InfoJoComponent],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
