import { ObjectId } from "mongodb";

export interface  IUserService {
    subscribbe(user: IUser) :Promise<void>;
    findOneUserFilteredBy(Iemail: string):Promise<IUser>;
    findAllUser(): Promise<[IUser] | void>
    requestForgotPassWord(Iemail: string);
    checkCode(req: ICheckRandonNumber): Promise<any>;
    changePassWord(user: ILoginCredential): Promise<void>;
    updateProfile(user: IProfile): Promise<IProfile>;
    updateAddress(_id: ObjectId,address: IAddress): Promise<IAddress>;
    getAddressOfClient(_id: ObjectId): Promise<IAddress>;
    login(login: ILoginCredential): Promise<any> ;
}



export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}
export interface IUser {
    _id?: string,
    name: string,
    email: string,
    salt?: string,
    role?: Role | string,  
    password: string,
    randomNumber?: number
}

export interface ILoginCredential {
    email: string,
    password: string,
}

export interface ICheckRandonNumber {
    Iemail: string,
    IrandomeNumber: number,
}


export interface IProfile {
    name: string,
    email: string,
    password?: string,
    salt?:string;
}


export interface IPayload {
    _id: ObjectId,
    name: string,
    email: string,
    role: Role,
}

export interface IAddress {
    pays: string,
    toClientDestination: string,
    addressPostal: string,
    ville: string,
    codePostal: number,
    numTel: number,
}