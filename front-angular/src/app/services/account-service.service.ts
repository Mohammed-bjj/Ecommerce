import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService} from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  
  private loggedIn = new BehaviorSubject<Boolean>(this.storage.loggeIn());

  authStatus = this.loggedIn.asObservable();
  constructor(private readonly storage: StorageService) { }



  changeStatus(value: boolean){
    this.loggedIn.next(value);
  }
}
