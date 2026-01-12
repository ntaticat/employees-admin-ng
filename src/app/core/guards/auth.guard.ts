import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService } from 'src/app/data/services/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authApiService: AuthApiService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.authApiService.isLoggedIn();

    if (!isLogged) {
      this.router.navigate(["/", "auth"]);
    }

    return isLogged;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.authApiService.isLoggedIn();

    if (!isLogged) {
      this.router.navigate(["/", "auth"]);
    }

    return isLogged;
  }

}
