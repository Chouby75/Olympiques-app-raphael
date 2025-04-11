import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';

import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<olympic[]> = of([]);
  public joCount!: number;

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [40, 20, 30, 10, 5],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
        ],
      },
    ],
  };

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.pipe(take(2)).subscribe((data) => {
      const allYears: Date[] = data.flatMap((o: olympic) =>
        o.participations.map((p: Participation) => p.year)
      );

      const uniqueYears = [...new Set(allYears)];

      this.joCount = uniqueYears.length;

      const countries = data.map((olympic: olympic) => olympic.country);

      this.pieChartData = {
        labels: countries,
        datasets: [
          {
            data: data.map((o: olympic) =>
              o.participations.reduce(
                (acc: number, p: Participation) => acc + p.medalsCount,
                0
              )
            ),
            backgroundColor: [
              '#793D52',
              '#89A1DB',
              '#9780A1',
              '#BFE0F1',
              '#B8CBE7',
            ],
          },
        ],
      };
    });
  }
}
