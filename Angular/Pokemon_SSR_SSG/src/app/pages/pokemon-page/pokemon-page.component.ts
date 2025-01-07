import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../pokemon/components/loader/loader.component';
import { PokemonListComponent } from '../../pokemon/components/pokemon-list/pokemon-list.component';
import type { PokemonBasic } from '../../pokemon/interfaces/pokemon';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { SeoService } from '../../shared/services/seo.service';

const toNumber = (value: string | undefined): number => {
  const id = Number(value);
  if (!value || isNaN(id) || id > 20 || id < 1) return 1;
  return id;
};

@Component({
  selector: 'app-pokemon-page',
  imports: [PokemonListComponent, LoaderComponent, RouterLink],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
})
export default class PokemonPageComponent {
  #seo = inject(SeoService);
  #pokemonService = inject(PokemonService);

  page = input.required({ transform: toNumber });
  pokemon = signal<PokemonBasic[]>([]);

  prevRoute = computed(() => {
    return this.page() === 1 ? '/pokemon/1' : `/pokemon/${this.page() - 1}`;
  });
  nextRoute = computed(() => {
    return this.page() === 20 ? '/pokemon/20' : `/pokemon/${this.page() + 1}`;
  });

  updateDataOnPageChange = effect(() => {
    this.#seo.updateSeo(`Pokedex - Page ${this.page()}`, 'POKEMON');
    this.loadPage(this.page());
  });

  loadPage(page: number = 0) {
    this.pokemon.set([]);
    this.#pokemonService
      .loadPage(page - 1)
      .subscribe((results) => this.pokemon.set(results));
  }
}
