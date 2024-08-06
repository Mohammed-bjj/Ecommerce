import { HttpException, Inject, Injectable, NestMiddleware, UnauthorizedException, UseGuards, Param } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUserService } from  '../../../output/models/interfaces/users/IUserService';
import { USER_SERVICE } from '../constantes/user/user';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../../../output/models/interfaces/users/IUserService'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor( 
        @Inject(USER_SERVICE) 
        private readonly userService: IUserService,
        private jwtService: JwtService,
    ){
    }

  private async checkToken(req: Request): Promise<IPayload>{

    const Token = req?.headers?.authorization;
    if(Token){
        try{
          const token = req.headers.authorization.split(' ')[1];
          return     await this.jwtService.verify(token, {secret: process.env.SECRET}) as IPayload;
        }catch(err){
            throw new UnauthorizedException()
        }
    }   
    throw new UnauthorizedException()
 }

  private async checkOwner(req: Request){
    const { _id, email } = await this.checkToken(req);
    const user = await this.userService.findOneUserFilteredBy(email);
    if(user && String(user._id) === String(_id)){ return user}
    throw new UnauthorizedException()
}
    
  async use(req: Request, res: Response, next: NextFunction) {

      if( await this.checkToken(req) && await this.checkOwner(req)){
        const {_id } = await this.checkToken(req);
        req.query.id = String(_id);
        next();
      }
     
  }
}
