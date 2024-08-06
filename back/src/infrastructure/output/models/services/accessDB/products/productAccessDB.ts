import { Product } from './../../../schema/product.schema';
import { IProduct, IUserAccessDB } from '../../../interfaces/products/IProductAccessDB';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { ObjectId } from "mongodb";


@Injectable()
export class ProductAccessMongoDB implements IUserAccessDB {
    
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>
    ){}
    
    
    
    async getAllProductFiltredByName(name: string): Promise<void | [IProduct]> {
        return await this.productModel.find({category: name}) as unknown as [IProduct];
    }
   
   
   
    async getAllProduct(): Promise<void | [IProduct]> {
       return await this.productModel.find({}) as unknown as [IProduct];
    }
    
    
    
    async isDbEmpt(): Promise<void | Boolean> {
        const isEmpty =  await this.productModel.find({});
        if(!isEmpty){
            return true;
        }    
        return false;
    }
  
  
  
    async removeOnProduct(_id: ObjectId): Promise<void> {
        await this.productModel.deleteOne({_id}).catch((e) => console.log('Error of reading from db'));
    }

    async removeAllProduct(): Promise<void> {
        await this.productModel.deleteMany({});
    }
   
   
   
    async  getOneProduct(_id: ObjectId): Promise<Object | void> {
       return await this.productModel.findOne({_id}).catch((e) => console.log('Error of reading from db',e));
    }
   
   
   
   
    async  updateProduct(product: IProduct, _id: ObjectId): Promise<IProduct | void> {
         await this.productModel.updateOne({_id}, product).catch( (err) => console.log('error of writing in db'));
        return this.getOneProduct(_id) as unknown as  IProduct;
    }
  
   
    async pushProduct(product: IProduct): Promise<IProduct | void> {
        const productCreated = await new this.productModel(product).save();
        if(!productCreated){
            console.log('Error to write in db')
        }
        return productCreated as unknown as IProduct;
    }
  
  
  
  
    
  

}