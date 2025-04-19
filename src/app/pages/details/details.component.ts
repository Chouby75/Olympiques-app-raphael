import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { ChartData, ChartType } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  public olympics$: Observable<olympic[]> = of([]);
  private subParams!: Subscription;
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
        data: [],
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

  private subscription: Subscription = new Subscription();

  constructor(
    private olympicService: OlympicService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    const olympicSub: Subscription = this.olympics$.subscribe((data) => {
      this.subParams = this.route.queryParams.subscribe((params) => {
        this.countryFocus = params['country'];
        const country = data.find(
          (country: olympic) => country.country === this.countryFocus
        );
        if (!country) {
          this.router.navigate(['/**'], {
            queryParams: { country: this.countryFocus },
          });
          return;
        }
        this.medalCount = country.participations.map(
          (p: Participation) => p.medalsCount
        );
        this.allYears = country.participations.map(
          (p: Participation) => p.year
        );
        const medalsCountSum = this.medalCount.reduce(
          (acc, curr) => acc + curr,
          0
        );
        const athletesCount = country.participations.map(
          (p: Participation) => p.athleteCount
        );
        const athletesCountSum = athletesCount.reduce(
          (acc, curr) => acc + curr,
          0
        );
        this.dataHeader = {
          entries: country.participations.length,
          medals: medalsCountSum,
          athletes: athletesCountSum,
        };

        this.pieChartData = {
          labels: this.allYears,
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
    });

    this.subscription.add(olympicSub);
    this.subscription.add(this.subParams);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
