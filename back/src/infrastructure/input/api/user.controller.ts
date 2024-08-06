import { ObjectId } from 'mongodb';
import { Controller, Inject, Post, Body, Get, UsePipes, ValidationPipe, UseGuards, Put, Patch, Param, Query } from '@nestjs/common';
import { IUserService } from '../../output/models/interfaces/users/IUserService';
import { CreateUserDto,
         LoginCredentialDTO,
         checkRandomNumberDTO ,
         ChangePassWordDTO,
         UpdateProfileDTO,     
         UpdateAddressDTO,
         DemandChangePasswodByEmailDTO,
         CreateAdminDTO
        } from '../dto/input/user.dto';
import { USER_SERVICE } from '../../package/config/constantes/user/user'
import { UpdatedProfileDTO } from '../dto/output/user.dto';
import { ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { RolesGuard } from '../../../infrastructure/package/config/autorisation/roles.guard';
import { Roles } from '../../package/config/autorisation/roles.decorator'; 


/**
 *  This class is responsable for controlling and redirecting http request to the corresponding services
 */
@Controller('users')
export class UserController {

    constructor( @Inject(USER_SERVICE) 
    private readonly userService: IUserService,    
    ){}

    @Post('/register')
    async createUser(@Body() userCreateDtp: CreateUserDto) {
        return await this.userService.subscribbe(userCreateDtp);
    }
    
    @Post('/login')
    async login(@Body() credential: LoginCredentialDTO) {
        return await this.userService.login(credential);
    }

    @Post('/forgotPassword')
    async makeRequestForgetPassWord(@Body() request: DemandChangePasswodByEmailDTO) {
        return this.userService.requestForgotPassWord(request.email);
    }
    
    @Post('/forgotPassword/checkCode')
    async checkCodeSentByEmail(@Body() req: checkRandomNumberDTO) { 
        return this.userService.checkCode(req);
    }

    @Put('/updatePassWord')
    async changePassWord(@Body() req: ChangePassWordDTO) {
        return this.userService.changePassWord(req);
    }
    
  

    @Patch('/updateProfile')
    async updateProfile(@Body() profile: UpdateProfileDTO):Promise<UpdatedProfileDTO>{
        return await this.userService.updateProfile(profile)
    }


    @Put('/updateAddress')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async updateAddress(@Query() id ,@Body() address: UpdateAddressDTO){
       return await this.userService.updateAddress(new ObjectId(id),address);
    }

    @Get('/address')
    async getAddress(@Query() id){
       return await this.userService.getAddressOfClient(new ObjectId(id));
    }


    @Post('/AddAdmin')
    @UseGuards(RolesGuard)
    @Roles('admin')
    async createAdmin(@Body() adminCreateDtp: CreateAdminDTO) {
        console.log('heho')
        return await this.userService.subscribbe(adminCreateDtp);
    }

    @Get('')
    @UseGuards(RolesGuard)
    @Roles('admin')
    async getAllUser(){
        return await this.userService.findAllUser();
    }
   

}
