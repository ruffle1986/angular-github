import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposComponent } from './repos.component';
import { By } from '@angular/platform-browser';

function getElement(fixture, id) {
  const debugElement = fixture.debugElement.query(By.css(`[data-test="${id}"]`));
  if (!debugElement) {
    return null;
  }
  return {
    debugElement,
    el: debugElement.nativeElement,
  };
}

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show an error message on the screen', () => {
    const button = getElement(fixture, 'searchButton');

    button.el.click();

    fixture.detectChanges();

    const errors = getElement(fixture, 'errors');

    expect(errors).toBeTruthy();

    expect(errors.el.textContent).toMatch(/Invalid user name/);
  });
});
