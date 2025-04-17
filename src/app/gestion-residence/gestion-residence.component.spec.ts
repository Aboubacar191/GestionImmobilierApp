import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionResidenceComponent } from './gestion-residence.component';

describe('GestionResidenceComponent', () => {
  let component: GestionResidenceComponent;
  let fixture: ComponentFixture<GestionResidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionResidenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
