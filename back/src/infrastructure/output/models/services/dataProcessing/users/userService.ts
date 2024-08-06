import {Injectable,ConflictException, Inject, NotFoundException, BadRequestException} from "@nestjs/common";
import {ICheckRandonNumber, ILoginCredential, IUser, IUserService, IProfile, IAddress } from "../../../interfaces/users/IUserService";
import { JwtService } from '@nestjs/jwt';
import  { USER_ACCESS_MONGODB }   from '../../../../../package/config/constantes/user/user';
import { UserAccessMongoDB } from "../../accessDB/users/userAccessDB";
import * as bcrypt from "bcrypt";
import { EmailService } from "../../../../web-services-externe/serviceMail/serviceSendGrid";
import { ObjectId } from "mongodb";
/**
 *  This class has responsability to define a logic of treatment the data before injected in db or x    
 */
@Injectable()
export class UserService implements IUserService {
    
    constructor(
        @Inject(USER_ACCESS_MONGODB) private readonly db: UserAccessMongoDB,
        private serviceMail:EmailService,
        private jwtService: JwtService

        ){}
   
   
    async findAllUser(): Promise<void | [IUser]> {
        return await this.db.getAllUSer();
    }
    async getAddressOfClient(_id: ObjectId): Promise<IAddress> {
        return await this.db.getOneUserFiltredByID(_id) as IAddress;
    }


        
    async updateAddress(_id: ObjectId,address: IAddress): Promise<IAddress> {
        const isUserExist  = await this.db.getOneUserFiltredByID(_id);
        if(!isUserExist){
            throw new NotFoundException('user not found ..');
        }

        const userUpdated = await this.db.updateAddress(_id,address);
        if(userUpdated){
            return userUpdated;
        }
    }
    
   
    
    async updateProfile(user: IProfile): Promise<IProfile> {
        this.checkIfEmailExist(user.email);
        if(user.password){
            const { newPasswordEncrypted, newSalt} = (await this.encryptPassWord(user.password));
            user.password  = newPasswordEncrypted;
            user.salt = newSalt;
        }
      const {name, email}  =  await this.db.updateProfile(user) as IProfile;
      return {
          name,
          email
      }
    }
    
    private async checkIfEmailExist(email: string){
        const userExist = await this.db.existUserFiltredBy(email).then( predicate => predicate);
        if(!userExist) { throw new BadRequestException() } 
    }

    private async encryptPassWord(pwd: string){
        const salt= await  bcrypt.genSalt();
        const pwdEncrypted =  await bcrypt.hash( pwd, salt).catch( err => console.log('Error of encrypting password'));
        return   {
            newSalt: salt,
            newPasswordEncrypted: pwdEncrypted,
        };
    }
   
    async changePassWord(user: ILoginCredential) {
        const {email, password} = user;
        this.checkIfEmailExist(email);
        const {newPasswordEncrypted, newSalt } = (await this.encryptPassWord(password));
        if(newPasswordEncrypted &&  newSalt){
            await this.db.updatePassWord(email, newPasswordEncrypted, newSalt);
        }
    }



    async checkCode(req: ICheckRandonNumber): Promise<any> {
        const { Iemail, IrandomeNumber} = req;
        const {  email, randomNumber, name, role, _id }  = await this.db.getOneUserFiltredBy(Iemail) as IUser;
        if(email !== Iemail ||  randomNumber !== IrandomeNumber){
            throw new BadRequestException();
        }
        await this.db.removeKeyRandomNumber(email);
        const payload = { _id, email, name, role};
        const token = await this.jwtService.sign(payload);
        return {
            "access_token": token,
        };
    }
   
   

    private generateRandomNumber(){
        return Math.floor(Math.random() * 999999);
    }   
   
    
    async requestForgotPassWord(Iemail: string) {
        const {  email, name }  = await this.db.getOneUserFiltredBy(Iemail) as IUser;
        if(email !== Iemail ){
            throw new BadRequestException('This email is not recognized');
        }
        const numberGenerated = this.generateRandomNumber();
        await this.db.setRandomNumber(email, numberGenerated);
        await this.serviceMail.send(email, name, numberGenerated);
    }
   
   
   
   
    async login(login: ILoginCredential): Promise<any> {
        try {
             var {email, name, password, salt, role, _id } = await this.findOneUserFilteredBy(login.email);
        } catch(err){ throw new NotFoundException("Email or Password is wrong"); }
        const pwdHashed = await bcrypt.hash(login.password, salt);
        console.log(pwdHashed)
        console.log(password);
        if(pwdHashed !== password ){
            throw new NotFoundException("Email or Password is wrong");
        } 
        
        const payload = {_id, email, name, role};
        const token = await this.jwtService.sign(payload);
        return {
            "access_token": token,
        };
    }
    public async findOneUserFilteredBy(Iemail: string): Promise<IUser> {
    
        const { name, email, password, salt, role, _id }  = await this.db.getOneUserFiltredBy(Iemail) as IUser;
        if( email ){
            return { _id, name, email, password, salt, role };
        }
        throw new NotFoundException("User filtred by Email don't exist");
    }
  
  
  


     /**
      * this method contains the procedure for register an user
      * @param user  
      */
     public async subscribbe(user: IUser): Promise<void> {
         console.log("med : ", user);
        const userExist = await this.db.existUserFiltredBy(user.email).then( predicate => predicate);
        if(!userExist) {
               user.salt= await  bcrypt.genSalt();
               user.password =  await bcrypt.hash(user.password, user.salt);
            await this.db.push(user);
        }
         else throw  new ConflictException("This account already exist");   
     }
 

    
  

}