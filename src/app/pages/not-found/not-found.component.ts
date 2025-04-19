import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public wrongCountry!: string;
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    const paramSub: Subscription = this.route.queryParams.subscribe(
      (params) => {
        this.wrongCountry = params['country'];
      }
    );

    this.subscription.add(paramSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
