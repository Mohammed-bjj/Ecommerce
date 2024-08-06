import { ProductServiceService } from 'src/app/services/product-service.service.';
import { ProductDTO } from './../../../models/productDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent implements OnInit {

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
  }

  product = {} as ProductDTO;


  
  productForm = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    author: new FormControl('',Validators.required),
    price: new FormControl('',[ Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
  });

  addNewProduct(){
    this.product.name = this.productForm.value.name;
    this.product.description = this.productForm.value.description;
    this.product.author = this.productForm.value.author;
    this.product.price = this.productForm.value.price;
    this.product.category = this.productForm.value.category;
    this.productService.createProduct(this.product).subscribe(() =>{
    },(err) =>{
      console.log(err);
    })
  }

}
