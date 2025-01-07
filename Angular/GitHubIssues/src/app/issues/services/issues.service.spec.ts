import { TestBed } from '@angular/core/testing';
import {
  provideQueryClient,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { State } from '../interfaces/issue';
import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;
  let queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      providers: [provideQueryClient(queryClient)],
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should apply closed state', async () => {
    service.setState(State.Closed);
    const { data } = await service.issuesQuery.refetch();

    expect(service.state()).toBe(State.Closed);
    data?.forEach((issue) => expect(issue.state).toBe(State.Closed));
  });

  it('Should apply open state', async () => {
    service.setState(State.Open);
    const { data } = await service.issuesQuery.refetch();

    expect(service.state()).toBe(State.Open);
    data?.forEach((issue) => expect(issue.state).toBe(State.Open));
  });

  it('Should apply label filters', () => {
    service.toggleLabel('Accesibility');
    expect(service.labels().has('Accesibility')).toBeTrue();

    service.toggleLabel('Accesibility');
    expect(service.labels().has('Accesibility')).not.toBeTrue();
  });

  it('Should get issues with Accesibility label', async () => {
    service.toggleLabel('Accesibility');
    const { data } = await service.issuesQuery.refetch();

    expect(service.labels().has('Accesibility')).toBeTrue();
    expect(data).toBeDefined();
    data?.forEach((issue) => {
      expect(
        issue.labels.some((label) => label.name === 'Accesibility'),
      ).toBeTrue();
    });
  });
});
