import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponentComponent } from './ranking-component.component';

describe('RankingComponentComponent', () => {
  let component: RankingComponentComponent;
  let fixture: ComponentFixture<RankingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
