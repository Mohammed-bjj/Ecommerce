
import { ObjectId } from "mongodb";

export interface  IUserAccessDB {
     pushProduct(product : IProduct):Promise<IProduct | void>;
     updateProduct(product: IProduct, _id: ObjectId):Promise<IProduct |void>;
     getOneProduct(_id: ObjectId): Promise<Object| void>;
     removeOnProduct(_id: ObjectId): Promise<void>;
     removeAllProduct(): Promise<void>;
     isDbEmpt():Promise<Boolean | void>;
     getAllProduct():Promise<[IProduct] | void>;
     getAllProductFiltredByName(name: string):Promise<[IProduct] | void>;
}



export interface IProduct {
    _id?: ObjectId,
    name: string,
    description:string,
    author: string,
    price: number,
    category: CategoryType
};


export enum CategoryType {
    INFORMATIQUE,
    SCIENCES,
    LITTERATURE,
    
}