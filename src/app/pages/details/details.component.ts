import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { ChartData, ChartOptions, ChartType, ChartEvent } from 'chart.js';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  public olympics$: Observable<olympic[]> = of([]);
  public dataHeader!: {
    entries: number;
    medals: number;
    athletes: number;
  };

  public countryFocus!: string;
  medalCount!: number[];
  allYears!: Date[];

  public pieChartType: ChartType = 'line';
  public pieChartData: ChartData<'line'> = {
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

  constructor(
    private olympicService: OlympicService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.pipe(take(2)).subscribe((data) => {
      this.route.queryParams.subscribe((params) => {
        this.countryFocus = params['country'];
        const country = data.find(
          (country: olympic) => country.country === this.countryFocus
        );
        if (!country) {
          console.error('Country not found in the data');
          return;
        }
        this.medalCount = country.participations.map(
          (p: Participation) => p.medalsCount
        );
        this.allYears = country.participations.map(
          (p: Participation) => p.year
        );
        const medalsCount = country.participations.map(
          (p: Participation) => p.medalsCount
        );
        const medalsCountSum = medalsCount.reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );
        const athletesCount = country.participations.map(
          (p: Participation) => p.athleteCount
        );
        const athletesCountSum = athletesCount.reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );
        this.dataHeader = {
          entries: country.participations.length,
          medals: medalsCountSum,
          athletes: athletesCountSum,
        };
      });

      this.pieChartData = {
        labels: this.allYears.flat(),
        datasets: [
          {
            label: this.countryFocus,
            data: this.medalCount,
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
