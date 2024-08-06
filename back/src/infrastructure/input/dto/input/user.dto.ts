import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsPostalCode, isPostalCode, IsString, IsEnum } from 'class-validator';
import { Role } from '../../../output/models/interfaces/users/IUserService';

class UserDTO {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}


export class CreateAdminDTO {

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({
        required: true,
        enum: Role,
        enumName: 'Role',
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role!: Role;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password!: string;

}
export class CreateUserDto  {
    
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password!: string;

}

export class DemandChangePasswodByEmailDTO {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;
}

export class checkRandomNumberDTO{
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    Iemail!: string;
    
    @ApiProperty({
        required: true,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    IrandomeNumber!: number;
}
export class LoginCredentialDTO extends UserDTO {}
export class ChangePassWordDTO extends UserDTO{}
export class UpdateProfileDTO {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({
        required: true,
        type: String,
    })

    @ApiProperty({
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    password?: string;
}


export class UpdateAddressDTO {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    pays: string;



    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    toClientDestination!: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    addressPostal: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    ville: string;

    @ApiProperty({
        required: true,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    codePostal: number;

    @ApiProperty({
        required: true,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    numTel: number;    
}