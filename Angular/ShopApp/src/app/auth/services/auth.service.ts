import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { LogInResponse, SignUpUserDto, UserApi } from '@auth/interfaces/user-api';
import { environment } from '@envs/environment';

type AuthStatus = 'pending' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.baseUrl;
  private readonly tokenStorageKey = environment.tokenStorageKey;

  private readonly _authStatus = signal<AuthStatus>('pending');
  readonly authStatus = computed(() => this._authStatus());

  private readonly _user = signal<UserApi | undefined>(undefined);
  readonly user = computed(() => this._user());

  private readonly _token = signal<string | null>(localStorage.getItem(this.tokenStorageKey));
  readonly token = computed(() => this._token());

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenStorageKey);
    if (!token) {
      this.clearAuthState();
      return of(false);
    }

    return this.processAuthResp(this.http.get<LogInResponse>(`${this.baseUrl}/auth/check-status`));
  }

  logIn(email: string, password: string): Observable<boolean> {
    return this.processAuthResp(
      this.http.post<LogInResponse>(`${this.baseUrl}/auth/login`, { email, password }),
    );
  }

  logOut(): void {
    this.clearAuthState();
    localStorage.removeItem(this.tokenStorageKey);
  }

  signUp(data: SignUpUserDto): Observable<boolean> {
    return this.processAuthResp(this.http.post<LogInResponse>(`${this.baseUrl}/auth/register`, data));
  }

  private processAuthResp(request: Observable<LogInResponse>): Observable<boolean> {
    return request.pipe(
      tap((resp) => this.setAuthState(resp)),
      map(() => true),
      catchError((error) => {
        this.clearAuthState();
        return of(false);
      }),
    );
  }

  private setAuthState(resp: LogInResponse): void {
    this._authStatus.set('authenticated');
    this._user.set(resp.user);
    this._token.set(resp.token);
    localStorage.setItem(this.tokenStorageKey, resp.token);
  }

  private clearAuthState(): void {
    this._user.set(undefined);
    this._authStatus.set('not-authenticated');
    this._token.set(null);
  }
}
