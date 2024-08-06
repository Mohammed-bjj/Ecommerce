import { BadRequestException } from '@nestjs/common';
import { Roles } from './../../package/config/autorisation/roles.decorator';
import { RolesGuard } from './../../package/config/autorisation/roles.guard';
import { ObjectId } from 'mongodb';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, SetMetadata, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from  '../../package/config/constantes/product/constantProduct'; 
import { IProductService } from '../../output/models/interfaces/products/IProductService';
import { CreateProductDTO, GetProductsFiltredByName} from '../dto/input/product.dto'


@Controller('products')
export class ProductController {
    constructor( @Inject(PRODUCT_SERVICE) 
    private readonly productService: IProductService,    
    ){}
    


@Post("/register")
@UseGuards(RolesGuard)
@Roles('admin')
async createproduct(@Body() product: CreateProductDTO){
    return this.productService.createProduct(product);
}

@Put('/:id')
@UseGuards(RolesGuard)
@Roles('admin')
async updateProduct(@Param('id') id: string, @Body() product: CreateProductDTO){
    return await this.productService.updateProduct(product, new ObjectId(id));
}

@Delete('/:id')
@UseGuards(RolesGuard)
@Roles('admin')
async deletOneProduct(@Param('id') id: string ){
    return await this.productService.removeOnProduct(new ObjectId(id));
}

@Delete('')
@UseGuards(RolesGuard)
@Roles('admin')
async deletAllProduct(){
   return await this.productService.removeAllProduct(); 
}


@Get('')
async getAllProduct(){
    return await this.productService.findAllProducts();
}


@Get('/filtred')
async getAllProductFiltredByCategory(@Query('cat') category: string){
    if(!category){
        throw new BadRequestException('name is not empty')
    }
    return await this.productService.findAllProductsFiltredByName(category);
}





}
