import {Injectable, Inject, ConflictException, NotFoundException} from "@nestjs/common";
import { ObjectId } from "mongodb";
import { IPanierService } from "../ports/panier/IPanierService";
import { PanierAccessMongoDB } from "src/infrastructure/output/models/services/accessDB/panier/panierAccessDB";
import { IProduct } from "src/infrastructure/output/models/interfaces/products/IProductAccessDB";
import { PANIER_ACCESS_MONGODB } from "src/infrastructure/package/config/constantes/panier/panierConstant";
/**
 *  This class has responsability to define a logic of treatment the data before injected in db or x    
 */
@Injectable()
export class PanierService implements IPanierService {
    
    constructor(
        @Inject(PANIER_ACCESS_MONGODB) private readonly db: PanierAccessMongoDB){}
   
    async findAllProductFromPanier(idUser: ObjectId, ): Promise<void | [IProduct]> {
        const existProduct  = await this.db.existProductFiltredByIdUSer(idUser);
        if(existProduct){
            return await this.db.getAllProductFromPanier(idUser) as unknown as [IProduct];
        }
        throw new NotFoundException();
    }
    async removeOneProductFromPanier(idProduct: ObjectId, idUser: ObjectId) {
        if(await this.db.existProduct(idProduct, idUser)){
            await this.db.deletOneProductFromPanier(idProduct, idUser);
        }
    }
    
    async addToPanier(idProduct: ObjectId, idUser: ObjectId): Promise<void> {
        console.log("here ")
       
        const cantAddProd = await this.db.existProduct(idProduct,idUser);
        if(cantAddProd){
            throw new ConflictException('Product already exist');
        }
            await this.db.addToPanier(idProduct, idUser);
    }
    
    
 
   
   
   
   
    
 

    
  

}