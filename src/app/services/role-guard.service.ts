import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthData } from 'src/app/models/account/auth-data.model';
import { ACCESS_TOKEN_KEY } from 'src/app/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private router: Router, 
    private jwt: JwtHelperService
    ) { }
 
  canActivate(route: ActivatedRouteSnapshot): boolean 
  {
    const expectedRole = route.data.expectedRole;
    const authData: AuthData = this.jwt.decodeToken(localStorage.getItem(ACCESS_TOKEN_KEY));
    
    if(expectedRole != authData.role)
    {
      this.router.navigate(['']);
      return false;
    }
    
    return true;
  }

}

export const ROLE_GUARD = 'Role guard'