import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJoComponent } from './info-jo.component';

describe('InfoJoComponent', () => {
  let component: InfoJoComponent;
  let fixture: ComponentFixture<InfoJoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoJoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoJoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
