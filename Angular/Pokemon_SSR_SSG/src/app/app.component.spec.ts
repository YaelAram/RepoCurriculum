import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'shared-navbar',
})
class NavbarComponentMock {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(AppComponent, {
        add: { imports: [NavbarComponentMock] },
        remove: { imports: [NavbarComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('Should create App Component', () => {
    expect(component).toBeTruthy();
  });

  it('Should render a header and contain the navbar', () => {
    const header = compiled.querySelector('header');

    expect(header).toBeTruthy();
    expect(header?.querySelector('shared-navbar')).toBeTruthy();
  });

  it('Should render a main and contain the router-outlet', () => {
    const main = compiled.querySelector('main');

    expect(main).toBeTruthy();
    expect(main?.querySelector('router-outlet')).toBeTruthy();
  });
});
