import { StorageService } from 'src/app/services/storage-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountServiceService } from '../services/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router,
    private accounteService: AccountServiceService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      if(!this.storage.loggeIn()){
        this.storage.remove();
        this.accounteService.changeStatus(false);
        this.router.navigateByUrl('home-user');
        return false;
      }
    return true;
  }
  
}
