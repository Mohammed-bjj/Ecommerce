import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getToken();
    if(token){
      const cloneReq = req.clone({ headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
      return next.handle(cloneReq);
    } else {
      return next.handle(req);
    }
  }

  
}
