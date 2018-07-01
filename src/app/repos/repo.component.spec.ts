import { RepoComponent } from './repo.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import testRepos from './testing/test-repos';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ReposService } from './repos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RepoComponent', () => {

  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ ReposService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.debugElement.componentInstance;

    component.repo = testRepos[0];

    fixture.detectChanges();
  });

  it('should be rendered appropriately', () => {

    const forkCount = fixture.debugElement.query(By.css('[data-test="forkCount"]')).nativeElement;
    const starCount = fixture.debugElement.query(By.css('[data-test="starCount"]')).nativeElement;
    const issueCount = fixture.debugElement.query(By.css('[data-test="issueCount"]')).nativeElement;
    const watcherCount = fixture.debugElement.query(By.css('[data-test="watcherCount"]')).nativeElement;

    expect(forkCount.textContent).toEqual(`Forks: ${testRepos[0].forks_count}`);
    expect(starCount.textContent).toEqual(`Stars: ${testRepos[0].stargazers_count}`);
    expect(issueCount.textContent).toEqual(`Issues: ${testRepos[0].open_issues_count}`);
    expect(watcherCount.textContent).toEqual(`Watchers: ${testRepos[0].watchers_count}`);

  });

});
