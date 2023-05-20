import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Form2Page } from './form2.page';

describe('Form2Page', () => {
  let component: Form2Page;
  let fixture: ComponentFixture<Form2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Form2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
