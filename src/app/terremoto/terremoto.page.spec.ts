import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerremotoPage } from './terremoto.page';

describe('TerremotoPage', () => {
  let component: TerremotoPage;
  let fixture: ComponentFixture<TerremotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerremotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
