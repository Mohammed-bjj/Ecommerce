import { Router } from '@angular/router';
import { AccountServiceService } from './../../../services/account-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'headerPage',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  currentUser = null;

  constructor(
      private accountService: AccountServiceService, 
      private tokenService: StorageService,
      private route: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getInfos();
  }


  inputSearch = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  search(){}
  
  logout(){
    this.tokenService.remove();
    this.route.navigateByUrl('/sign-page');
  }

  redirectHomePage(){
    const routerRole = this.tokenService.getInfos().role;
    switch(routerRole){
      case 'user' :  this.route.navigateByUrl("/mon-compte"); break;
      case 'admin':  this.route.navigateByUrl("home-admin"); break;
    }
  }
}
