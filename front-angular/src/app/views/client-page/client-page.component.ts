import { StorageService } from './../../services/storage-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
})
export class ClientPageComponent implements OnInit {
  constructor(
    private tokenService: StorageService,
    private route: Router
    ){}

  ngOnInit(): void {
   // this.storage.theresAnyUserLogged();
  }

  logout() {
    this.tokenService.remove();
    this.route.navigateByUrl('/sign-page');
  }
}
