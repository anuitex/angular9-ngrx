import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { AuthData } from '../models/account/auth-data.model';
import { Tokens } from '../models/account/tokens.model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs/operators';
import { SignUpModel } from '../models/account/sign-up.model';

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private url = `${environment.bookstoreApiUrl}/account`;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  get getAccessToken()
  {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  signIn(body: { email: string, password: string }) : Observable<AuthData> 
  {
    return this.http.post<Tokens>(`${this.url}/sign-in`, body).pipe(
      tap((token: { accessToken: string; refreshToken: string; }) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
      }),
      map(data => {
        return this.jwtHelper.decodeToken(data.accessToken);
      })
    )
  }

  signUp(user: SignUpModel) 
  {
    return this.http.post(`${this.url}/sign-up`, user);
  }

  signOut(email: string)
  {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    return this.http.post(`${this.url}/sign-out/${email}`, null);
  }

  confirmEmail(email: string, token: string) 
  {
    return this.http.post(`${this.url}/confirm-email`, null , { params: { email, token } });
  }

  forgotPassword(email: string)
  {
    return this.http.post(`${this.url}/forgot-password`, null , { params: { email }});
  }

  refreshTokens(tokens: Tokens): Observable<AuthData>
  {
    return this.http.post<Tokens>(`${this.url}/refresh-token`, tokens).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken)
      }),
      map(
        data => {
          return this.jwtHelper.decodeToken(data.accessToken);
        })
      );
  }
}