import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMaintenanceComponent } from './gestion-maintenance.component';

describe('GestionMaintenanceComponent', () => {
  let component: GestionMaintenanceComponent;
  let fixture: ComponentFixture<GestionMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
