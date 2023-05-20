import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Form3Page } from './form3.page';

describe('Form3Page', () => {
  let component: Form3Page;
  let fixture: ComponentFixture<Form3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Form3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
