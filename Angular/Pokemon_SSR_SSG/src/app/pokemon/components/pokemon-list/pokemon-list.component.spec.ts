import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let component: PokemonListComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('Should create Pokemon List Component', () => {
    expect(component).toBeTruthy();
  });

  it('Should render empty array message', () => {
    fixture.componentRef.setInput('pokemon', []);
    fixture.detectChanges();

    const message = compiled.querySelector('p')!;

    expect(message).toBeDefined();
    expect(message.innerText).toBe("There aren't pokemon to show");
  });

  it('Should render two Pokemon Cards message', () => {
    fixture.componentRef.setInput('pokemon', [
      { id: '1', name: 'bulbasaur' },
      { id: '2', name: 'charmander' },
    ]);
    fixture.detectChanges();

    const cards = Array.from(compiled.querySelectorAll('pokemon-card')!);
    expect(cards).toHaveSize(2);
  });
});
