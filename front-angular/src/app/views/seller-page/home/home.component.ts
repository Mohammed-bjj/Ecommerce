import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage-service.service'; 
import { CreateProductDialogComponent } from '../../dialogs/create-product-dialog/create-product-dialog.component';
import { CreateAdminComponent } from '../../dialogs/create-admin/create-admin.component';
import { ClientService } from '../../../services/client-service.service'; //'src/app/services/client-service.service';
import { ProductServiceService } from  '../../../services/product-service.service.'; //'src/app/services/product-service.service.';
import { ProductDTO } from  '../../../models/productDTO';


export interface AllUSer {
  name: string;
  email: string;
  role: string;

}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  displayedColumns: string[] = ['name', 'email', 'role'];
  displayedColumnsProd: string[] = ['name', 'description', 'author', 'price', 'category'];

  clickedRows = new Set<AllUSer>();
  clickedRowsProd = new Set<ProductDTO>();

  isUserVisible = true;

  dataSource = {} as AllUSer[] | ProductDTO[];
  dataSource1 = {} as ProductDTO[];


  constructor(    
     private tokenService: StorageService,     
     private route: Router,
     private dialog: MatDialog,
     private _snackBar: MatSnackBar,
     private clientService: ClientService,
     private productService: ProductServiceService
    ) { }

  ngOnInit(): void {
     this.serachAllUser();
  }
  
  serachAllUser(){
    this.clientService.getAllUser().subscribe( 
      res => this.handleResponseUser(res),
      err => this.handleEror(err.status)
  );
  }


  searchAllproducts(){
    this.productService.getAllProducts().subscribe( 
      res => this.handleResponseProducts(res),
      err => this.handleEror(err.status)
  );
  }

  handleResponseProducts(res){
    this.dataSource1 = res;
  }

  
  handleResponseUser(res){
    this.dataSource = res;
  }  

  handleEror(status){

  }


  listAlluser(){
    this.isUserVisible = true;
    this.serachAllUser();
  }


  listAllProduct(){
    this.isUserVisible = false;
    this.searchAllproducts();


  }
  logout() {
    this.tokenService.remove();
    this.route.navigateByUrl('/sign-page');
  }

  showSnackBarProductCreated(action: string) {
    this._snackBar.open(
      'You have created a new product',
      action,

      {
        duration: 3000,
      }
    );
  }


  showSnackBarAdminCreated(action: string) {
    this._snackBar.open(
      'You have created a new product',
      action,

      {
        duration: 3000,
      }
    );

  }
 
  openSaveDialog(){
    console.log('hello ' );
    const dialogRef = this.dialog.open(CreateProductDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSnackBarProductCreated('Dismiss');
      }
    });
  }

  openSaveDialogAdmin(){
    const dialogRef = this.dialog.open(CreateAdminComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSnackBarAdminCreated('Dismiss');
      }
    });
  }


















}
