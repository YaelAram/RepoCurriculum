import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PokemonCardComponent } from './pokemon-card.component';

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};

const mockUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let component: PokemonCardComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('Should create Pokemon Card Component', () => {
    expect(component).toBeTruthy();
  });

  it('Should show mock pokemon', () => {
    const name = compiled.querySelector('p')!;
    const img = compiled.querySelector('img')!;
    const url = img.getAttribute('src')!;

    expect(name).toBeDefined();
    expect(name.innerText).toBe('Bulbasaur');
    expect(img).toBeDefined();
    expect(url).toBe(mockUrl);
  });

  it('Should match input value with mock pokemon', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('Should create the correct url sprite', () => {
    expect(component.spriteUrl()).toBe(mockUrl);
  });

  it('Should show the router link', () => {
    expect(compiled.querySelector('a')?.getAttribute('href')).toBe(
      '/pokemon/by/bulbasaur'
    );
  });
});
