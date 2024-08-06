import { CategoryType } from './../../../output/models/interfaces/products/IProductAccessDB';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsPostalCode, isPostalCode, IsString } from 'class-validator';

export class CreateProductDTO {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    description!:string;
  
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    author!:string;
  
    @ApiProperty({
        required: true,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    price!:number;

    @ApiProperty({
        required: true,
        enum: CategoryType,
        enumName: 'CategoryType',
    })
    @IsNotEmpty()
    @IsEnum(CategoryType)
    category!:CategoryType;
}



export class GetProductsFiltredByName {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name!: string;
}