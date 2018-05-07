import {Injectable} from '@angular/core';
import {Router , CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authService : AuthService,
    private router : Router){}
   
    canActivate( next:ActivatedRouteSnapshot,
    state : RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean{     
    if (this.authService.loggedIn()){
        return true;
    }  
    else{
        this.router.navigate([""]);
    }
  }
}