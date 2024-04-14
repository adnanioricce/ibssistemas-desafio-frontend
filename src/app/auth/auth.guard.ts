import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";
export const authGuard: CanActivateFn  = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    console.log('on auth guard')
    if (auth.isAuthenticated()) {
        console.log('user authenticated')
        return true;
    } else {        
        console.log('user not authenticated')
        router.navigate(['auth/login']);
        return false;
    }
}