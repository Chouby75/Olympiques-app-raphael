import { Component, OnInit, Input } from '@angular/core';
import { InfoJoComponent } from './info-jo/info-jo.component';
import { CommonModule } from '@angular/common';
import { olympic } from '../core/models/Olympic';
import { Observable } from 'rxjs';
import { OlympicService } from '../core/services/olympic.service';
import { Participation } from '../core/models/Participation';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [InfoJoComponent, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() olympics$!: Observable<olympic[]>;
  public joCount!: number;
  public countries!: string[];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.pipe(take(2)).subscribe((data) => {
      const allYears: Date[] = data.flatMap((o: olympic) =>
        o.participations.map((p: Participation) => p.year)
      );

      const uniqueYears = [...new Set(allYears)];

      this.joCount = uniqueYears.length;
    });
  }
}
