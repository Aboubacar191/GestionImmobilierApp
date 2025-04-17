import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetaitAdminsComponent } from './user-detait-admins.component';

describe('UserDetaitAdminsComponent', () => {
  let component: UserDetaitAdminsComponent;
  let fixture: ComponentFixture<UserDetaitAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetaitAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetaitAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
