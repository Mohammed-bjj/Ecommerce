import { IUserAccessDB } from '../../../interfaces/users/IUserAccessDB';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { IUser, IProfile, IPayload, IAddress } from "../../../interfaces/users/IUserService";
import { User} from '../../../schema/user.schema';
import { ObjectId } from "mongodb";


@Injectable()
export class UserAccessMongoDB implements IUserAccessDB {
    
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}
    
    
    
    async getAllUSer(): Promise<void | [IUser]> {
        return await (await this.userModel.find({})) as unknown as [IUser];
    }
  
  
  
  
    async getOneUserFiltredByID(_id: ObjectId): Promise<void | Object> {
        return  await this.userModel.findOne({_id}).catch( (err) => console.log('Error to read from DB : ', err));
    }
  
  
  
    async updateAddress(_id: ObjectId, ad: IAddress): Promise<void | IAddress> {
        await this.userModel.updateOne({_id}, ad).catch( (err) => console.log('Error to write in DB : ', err));
        return await this.userModel.findOne({_id}).select(ad) as IAddress;
    }
    
   
    async updateProfile(profile: IProfile): Promise<IProfile | void> {
        const {  email } = profile;
        await this.userModel.updateOne({email}, profile ).catch((err) => console.log('Error to write in DB : ', err)); 
        return await this.getOneUserFiltredBy(email) as IProfile;
    }
   
    async updatePassWord(email: string, pwd: String, salt: string): Promise<void> {
        await this.userModel.updateOne({email}, {password: pwd, salt: salt}).catch( (err) => console.log('Error to write in DB : ', err));
    }
     
    
    public async getOneUserFiltredBy(email: string): Promise<Object | void> {
        return  await this.userModel.findOne({email}).catch( (err) => console.log('Error to read from DB : ', err));
    }
   
    async push(user: IUser): Promise<void> {
        console.log("ici", user);
       const userCreated =  await new this.userModel(user);
       await userCreated.save();
    }
    
    async existUserFiltredBy(email: String): Promise<Boolean | void>  {
           return await this.userModel.exists({ email }).catch( err => console.log("Error of reading from Db :", err));
    }
 
    async setRandomNumber(email: string,nbr: number){
        await this.userModel.updateOne({email}, {randomNumber: nbr}).catch( err => console.log("Error of writing in DB:", err));
    }

    async removeKeyRandomNumber(email: string){
        await this.userModel.updateOne({email}, {randomNumber: undefined}).catch( err => console.log("Error of writing in DB:", err));
    }
   
    

    
  

}