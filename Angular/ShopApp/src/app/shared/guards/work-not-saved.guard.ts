import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface PageCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const workNotSavedGuard: CanDeactivateFn<PageCanDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
