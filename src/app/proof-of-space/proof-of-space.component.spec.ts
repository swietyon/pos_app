import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofOfSpaceComponent } from './proof-of-space.component';

describe('ProofOfSpaceComponent', () => {
  let component: ProofOfSpaceComponent;
  let fixture: ComponentFixture<ProofOfSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofOfSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofOfSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
