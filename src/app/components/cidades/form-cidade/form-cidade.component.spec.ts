import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCidadeComponent } from './form-cidade.component';

describe('FormCidadeComponent', () => {
  let component: FormCidadeComponent;
  let fixture: ComponentFixture<FormCidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
