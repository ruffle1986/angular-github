import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposComponent } from './repos.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReposService, Repo } from './repos.service';
import { defer, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

  data: Repo[] = [{
    id: 1,
    name: 'foo',
    full_name: 'foo_full',
    html_url: 'http://foo.com',
    forks_count: 42,
    stargazers_count: 43,
    open_issues_count: 44,
    watchers_count: 45,
    owner: {
      id: 11,
      login: 'ruffle1986',
      avatar_url: 'http://avatar.com',
      html_url: 'http://html.url',
    }
  }, {
    id: 2,
    name: 'bar',
    full_name: 'bar_full',
    html_url: 'http://bar.com',
    forks_count: 52,
    stargazers_count: 53,
    open_issues_count: 54,
    watchers_count: 55,
    owner: {
      id: 11,
      login: 'ruffle1986',
      avatar_url: 'http://avatar.com',
      html_url: 'http://html.url',
    }
  }];

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
      declarations: [ ReposComponent ],
      imports: [ HttpClientTestingModule ],
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
