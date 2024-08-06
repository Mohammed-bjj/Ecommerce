import { Router } from '@angular/router';
import { ProductServiceService } from  '../../../services/product-service.service.';//'src/app/services/product-service.service.';
import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  
  constructor(private productService: ProductServiceService,private router: Router){};
  
  typesOfShoes: string[] = ['INFORMATIQUE', 'SCIENCES', 'LITTERATURE', 'Entreprise & Droit', 'Vie pratique'];

  slides = [
    {'image': '../../../../assets/li1.jpg'}, 
    {'image': '../../../../assets/ll2.jpg'},
    {'image': '../../../../assets/ll3.jpg'}, 
    {'image': '../../../../assets/ll4.jpg'}
  ];


  choiceOfMenu(choice){
    if(choice){
      this.productService.category = choice;
      this.router.navigateByUrl('product');
    }
  }

 

 
  


 
  
  ngOnInit(): void {}

  


}
