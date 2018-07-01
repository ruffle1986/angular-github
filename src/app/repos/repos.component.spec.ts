import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposComponent } from './repos.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReposService, Repo } from './repos.service';
import { defer, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RepoComponent } from './repo.component';
import testRepos from './testing/test-repos';

function getElement(fixture, id): { debugElement: DebugElement, el: HTMLElement } {
  const debugElement = fixture.debugElement.query(By.css(`[data-test="${id}"]`));
  if (!debugElement) {
    return null;
  }
  return {
    debugElement,
    el: debugElement.nativeElement,
  };
}

function getElements(fixture, id): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(`[data-test="${id}"]`));
}

class TestRepoService extends ReposService {

  data: Repo[] = testRepos;

  getAll(): Observable<Repo[]> {
    return defer(() => Promise.resolve(this.data));
  }
}

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let service: TestRepoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposComponent, RepoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ReposService, useClass: TestRepoService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(ReposService) as TestRepoService;
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

  it('should render the list of the repos', (done) => {
    const input = getElement(fixture, 'searchField');
    const button = getElement(fixture, 'searchButton');

    (input.el as HTMLInputElement).value = 'ruffle1986';

    button.el.click();

    fixture.detectChanges();

    component.repos$.subscribe((repos) => {

      fixture.detectChanges();

      const repoEls = getElements(fixture, 'repo');

      expect(repoEls.length).toEqual(service.data.length);

      done();
    });
  });
});
