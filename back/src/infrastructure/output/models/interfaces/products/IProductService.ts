import { ObjectId } from "mongodb";
import { IProduct } from "./IProductAccessDB";

export interface  IProductService {
        
    createProduct(product: IProduct):Promise<IProduct| void>;
    updateProduct(product: IProduct, _id: ObjectId): Promise<IProduct | void>;
    removeOnProduct(_id: ObjectId): Promise<void>;
    removeAllProduct(): Promise<void>;
    findAllProducts():Promise<[IProduct] | void>;
    findAllProductsFiltredByName(name: string):Promise<[IProduct] | void>;
    
}





