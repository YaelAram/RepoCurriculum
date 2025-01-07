import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Should navigate to About Page and load proper component', async () => {
    await router.navigateByUrl('/about');

    const route = routes.find(({ path }) => path === 'about')!;
    const component = (await route.loadComponent!()) as any;

    expect(route).toBeDefined();
    expect(location.path()).toBe('/about');
    expect(component.default.name).toBe('AboutPageComponent');
  });

  it('Should navigate to Pricing Page and load proper component', async () => {
    await router.navigateByUrl('/pricing');

    const route = routes.find(({ path }) => path === 'pricing')!;
    const component = (await route.loadComponent!()) as any;

    expect(route).toBeDefined();
    expect(location.path()).toBe('/pricing');
    expect(component.default.name).toBe('PricingPageComponent');
  });

  it('Should navigate to Contact Page and load proper component', async () => {
    await router.navigateByUrl('/contact');

    const route = routes.find(({ path }) => path === 'contact')!;
    const component = (await route.loadComponent!()) as any;

    expect(route).toBeDefined();
    expect(location.path()).toBe('/contact');
    expect(component.default.name).toBe('ContactPageComponent');
  });

  it('Should navigate to Pokemon Page 15 and load proper component', async () => {
    await router.navigateByUrl('/pokemon/15');

    const route = routes.find(({ path }) => path === 'pokemon/:page')!;
    const component = (await route.loadComponent!()) as any;

    expect(route).toBeDefined();
    expect(location.path()).toBe('/pokemon/15');
    expect(component.default.name).toBe('PokemonPageComponent');
  });

  it('Should navigate to Pokemon Page with ID 12 and load proper component', async () => {
    await router.navigateByUrl('/pokemon/by/12');

    const route = routes.find(({ path }) => path === 'pokemon/by/:id')!;
    const component = (await route.loadComponent!()) as any;

    expect(route).toBeDefined();
    expect(location.path()).toBe('/pokemon/by/12');
    expect(component.default.name).toBe('ByIdPageComponent');
  });

  it('Should navigate to Default Page and load proper component', async () => {
    await router.navigateByUrl('/asd');

    const route = routes.find(({ path }) => path === 'pokemon/:page')!;
    const component = (await route.loadComponent!()) as any;

    expect(route).toBeDefined();
    expect(location.path()).toBe('/pokemon/1');
    expect(component.default.name).toBe('PokemonPageComponent');
  });
});
