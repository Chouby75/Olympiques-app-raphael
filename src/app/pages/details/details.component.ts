import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { ChartData, ChartOptions, ChartType, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  public olympics$: Observable<olympic[]> = of([]);

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
  }
}
