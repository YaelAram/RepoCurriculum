// import { HttpClient, provideHttpClient } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';

// import { PokemonBasic } from '../interfaces/pokemon';
// import { PokemonService } from './pokemon.service';

// const pokemon: PokemonBasic[] = [
//   { id: '1', name: 'bulbasaur' },
//   { id: '2', name: 'charmander' },
// ];
// const mockPokemon = { id: '1', name: 'bulbasaur' };

// describe('PokemonService', () => {
//   let service: PokemonService;
//   let httpClientSpy: jasmine.SpyObj<HttpClient>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [provideHttpClient()],
//     });

//     service = TestBed.inject(PokemonService);
//     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
//   });

//   it('Should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('Should return a list of pokemon', () => {
//     httpClientSpy.get.and.returnValue(asyncData(pokemon));
//   });
// });
