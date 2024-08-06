import { ObjectId } from "mongodb";
import { IUser, IProfile, IAddress } from "./IUserService";

export interface  IUserAccessDB {
    getAllUSer(): Promise<[IUser] | void>;
    push(user: IUser) :Promise<void>;
    existUserFiltredBy(email: string): Promise<Boolean |void>;
    getOneUserFiltredBy(email: string): Promise<Object| void>;
    updatePassWord(email: string, pwd: String, salt:string): Promise<void>;
    updateProfile(profile: IProfile): Promise<object | void>;
    updateAddress(_id: ObjectId,profile: IAddress): Promise<IAddress | void>;
    getOneUserFiltredByID(id: ObjectId): Promise<Object| void>;
}