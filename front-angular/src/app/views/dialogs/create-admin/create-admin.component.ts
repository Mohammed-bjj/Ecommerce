import { ClientService } from 'src/app/services/client-service.service';
import { Admin } from './../../../models/users/admin';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service.';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  admin = {} as Admin;


  
  adminForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    role: new FormControl('',Validators.required),
    password: new FormControl('',[ Validators.required]),
  });

  addNewAdmin(){
    this.admin.name = this.adminForm.value.name;
    this.admin.email = this.adminForm.value.email;
    this.admin.role = this.adminForm.value.role;
    this.admin.password = this.adminForm.value.password;
    this.clientService.createAdmin(this.admin).subscribe(() =>{
    },(err) =>{
      console.log(err);
    })
  }
}
