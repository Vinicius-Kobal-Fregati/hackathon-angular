import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetraInicialComponent } from './letra-inicial.component';

describe('LetraInicialComponent', () => {
  let component: LetraInicialComponent;
  let fixture: ComponentFixture<LetraInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetraInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetraInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
