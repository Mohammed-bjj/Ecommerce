import { ObjectId } from 'mongodb';
import { Controller, Get, Inject, Delete, Param, Post, Body, Query } from '@nestjs/common';
import { PANIER_SERVICE } from '../../package/config/constantes/panier/panierConstant';
import { AddProductToPanier } from '../dto/input/panier.dto';
import { IPanierService } from 'src/domain/ports/panier/IPanierService';
@Controller('panier')
export class PanierController {
    
    constructor( @Inject(PANIER_SERVICE) 
    private readonly panierService: IPanierService,    
    ){}


    @Get('products/:id')
    async getAllProduct(@Param('id') idU: string){
        return await this.panierService.findAllProductFromPanier(new ObjectId(idU));
    }

    @Delete('/product')
    async deletOneProductFromPanier(@Query('idPro') idPro: string, @Query('idU') idUs: string){
        console.log(idPro,"  ;  ",  idUs);
        return await this.panierService.removeOneProductFromPanier(new ObjectId(idPro), new ObjectId(idUs));
    }


    @Post('/Addproducts')
    async addProductToPanier(@Body() panier: AddProductToPanier){
        const {idProduct, idUser} = panier;
        return await this.panierService.addToPanier(new ObjectId(idProduct), new ObjectId(idUser));
    }

}
