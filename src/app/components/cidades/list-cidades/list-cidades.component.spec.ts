import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCidadesComponent } from './list-cidades.component';

describe('ListCidadesComponent', () => {
  let component: ListCidadesComponent;
  let fixture: ComponentFixture<ListCidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
