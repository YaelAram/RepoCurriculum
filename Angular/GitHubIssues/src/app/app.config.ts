import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import {
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental';
import { provideMarkdown } from 'ngx-markdown';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    provideMarkdown(),
  ],
};
