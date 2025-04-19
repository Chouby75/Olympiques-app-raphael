import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { ChartData, ChartType } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<olympic[]> = of([]);
  private subscription: Subscription = new Subscription();

  public dataHeader!: {
    jos: number;
    countries: number;
  };

  public coutryFocus!: string;
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

  constructor(private olympicService: OlympicService, private router: Router) {}

  public onChartClick(event: any): void {
    const chart = event.event.chart;
    if (!chart) return;

    const activePoints = chart.getElementsAtEventForMode(
      event.event,
      'nearest',
      { intersect: true },
      true
    );

    if (activePoints.length > 0) {
      const firstPoint = activePoints[0];
      const label = chart.data.labels[firstPoint.index];
      this.router.navigate(['/details'], {
        queryParams: { country: label },
      });
    }
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    const olympicSub: Subscription = this.olympics$.subscribe((data) => {
      const allYears: Date[] = data.flatMap((o: olympic) =>
        o.participations.map((p: Participation) => p.year)
      );

      const uniqueYears: Date[] = [...new Set(allYears)];
      this.joCount = uniqueYears.length;

      const countries: string[] = data.map(
        (olympic: olympic) => olympic.country
      );

      this.dataHeader = {
        jos: this.joCount,
        countries: countries.length,
      };

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
            hoverBackgroundColor: [
              '#793D52',
              '#89A1DB',
              '#9780A1',
              '#BFE0F1',
              '#B8CBE7',
            ],
            hoverBorderColor: 'black',
            hoverBorderWidth: 3,
          },
        ],
      };
    });

    this.subscription.add(olympicSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
