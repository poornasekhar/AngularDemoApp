import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';

@Injectable({
    providedIn:'root'
})

export class LoginActivate implements CanActivate {
    constructor(private tokener: TokenService) {}
    canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<boolean>|Promise<boolean>| boolean{
        return this.tokener.isListed();
    }
}
