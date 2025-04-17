import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLocataireComponent } from './gestion-locataire.component';

describe('GestionLocataireComponent', () => {
  let component: GestionLocataireComponent;
  let fixture: ComponentFixture<GestionLocataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionLocataireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
