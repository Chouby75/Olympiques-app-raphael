import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
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

    this.olympics$.subscribe((data) => {
      if (!data) {
        return;
      }
      const allYears: number[] = data.flatMap((o: any) =>
        o.participations.map((p: any) => p.year)
      );

      const uniqueYears = [...new Set(allYears)];

      this.joCount = uniqueYears.length;

      const countries = data.map((olympic: any) => olympic.country);

      this.pieChartData = {
        labels: countries,
        datasets: [
          {
            data: data.map((o: any) =>
              o.participations.reduce(
                (acc: number, p: any) => acc + p.medalsCount,
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
