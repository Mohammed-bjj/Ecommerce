import { IProduct } from '../../../interfaces/products/IProductAccessDB';
import {  Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IPanierAccessDB } from 'src/domain/ports/panier/IPanierAccesDB';
import { Panier } from '../../../schema/panier.schema';
import { Product } from '../../../schema/product.schema';


@Injectable()
export class PanierAccessMongoDB implements IPanierAccessDB {
    
    
    constructor
    (@InjectModel(Panier.name) 
    private readonly paniertModel: Model<Panier>,
    @InjectModel(Product.name)
     private readonly productModel: Model<Product>
    ){}

    async existProduct(idProduct: ObjectId, idUser: ObjectId): Promise<Boolean> {
        const dd = await this.paniertModel.find({idProduct: idProduct, idUser: idUser})
        
        return await this.paniertModel.exists({idProduct: idProduct, idUser: idUser});
    }
    async existProductFiltredByIdproduct(idProd: ObjectId): Promise<Boolean> {
        const existUser =  await this.paniertModel.exists({idProduct: idProd}).catch(() => console.log('error of db'));
        if(existUser){
            return true;
        }
        return false;
    }
    async existProductFiltredByIdUSer(idUser: ObjectId): Promise<Boolean> {
        const existUser =  await this.paniertModel.exists({idUser: idUser}).catch(() => console.log('error of db'));
       console.log(existUser);
        if(existUser){
            return true;
        }
        return false;
    }
    
    async getAllProductFromPanier(idUser: ObjectId): Promise<void | Array<IProduct>> {
        let prods: Array<IProduct>=[]; 
       const idU =  await this.paniertModel.find({idUser: idUser}); 
     for (let index = 0; index < idU.length; index++) {
         const element = idU[index];
         let p = await this.productModel.findOne({_id: element.idProduct}) as unknown as IProduct;
         prods.push(p);     
     }
     return prods;
    }
    async deletOneProductFromPanier(idProduct: ObjectId, idUser: ObjectId) {
      await this.paniertModel.deleteOne({_idProduct: idProduct}).catch( e => console.log('error of reading db '));
    }
   
   
   
   
    async addToPanier(_idProduct: ObjectId, _idUser: ObjectId): Promise<void> {
       const dd =  await new this.paniertModel({idProduct: _idProduct, idUser: _idUser}).save();
    }
   
   
   
  
    
    
    
  
  
  
  
  
    
  

}