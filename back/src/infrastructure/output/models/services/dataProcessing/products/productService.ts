import { Product } from './../../../schema/product.schema';
import {Injectable, Inject, NotFoundException, BadRequestException} from "@nestjs/common";
import  { PRODUCT_ACCESS_MONGODB }   from '../../../../../package/config/constantes/product/constantProduct';
import {  ProductAccessMongoDB } from "../../accessDB/products/productAccessDB";
import { IProductService } from '../../../interfaces/products/IProductService'
import { IProduct } from "../../../interfaces/products/IProductAccessDB";
import { ObjectId } from "mongodb";
/**
 *  This class has responsability to define a logic of treatment the data before injected in db or x    
 */
@Injectable()
export class ProductsService implements IProductService {
    
    constructor(
        @Inject(PRODUCT_ACCESS_MONGODB) private readonly db: ProductAccessMongoDB
        ){}
   
   
   
    async findAllProductsFiltredByName(name: string): Promise<void | [IProduct]> {
        const productsExist = await this.db.getAllProductFiltredByName(name);
        if(!productsExist){
            throw new NotFoundException('product not found');
        }
       return productsExist;
    }
  
  
  
  
    async findAllProducts(): Promise<void | [IProduct]> {
        const productsExist = await this.db.getAllProduct();
        if(!productsExist){
            throw new NotFoundException('product not found');
        }
       return productsExist;
    }
    
    
    
    async removeOnProduct(_id: ObjectId): Promise<void> {
        const isProductExist = await this.db.getOneProduct(_id);
        if(!isProductExist){
            throw new NotFoundException('Product don t exist');
        }
        await this.db.removeOnProduct(_id);
    }
    
    
    async removeAllProduct(): Promise<void> {
        const isEmpty = await this.db.isDbEmpt();
        if(!isEmpty){
            await this.db.removeAllProduct();
        }
        else throw new NotFoundException('Any Element in the DB')
    }
    
    
    
    
    async  updateProduct(product: IProduct, _id: ObjectId): Promise<IProduct | void> {
        return await this.db.updateProduct(product, _id);
    }
   
    async createProduct(product: IProduct): Promise<IProduct| void> {
        return await this.db.pushProduct(product);
    }
    
 

    
  

}