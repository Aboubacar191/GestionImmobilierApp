import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrementsComponent } from './enregistrements.component';

describe('EnregistrementsComponent', () => {
  let component: EnregistrementsComponent;
  let fixture: ComponentFixture<EnregistrementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregistrementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnregistrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
