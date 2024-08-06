import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class AddProductToPanier {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsMongoId()
    idProduct!: string;


    @ApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsMongoId()
    idUser!: string;
}