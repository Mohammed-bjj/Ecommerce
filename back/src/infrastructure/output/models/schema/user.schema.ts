import { Role } from './../interfaces/users/IUserService';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, SchemaType } from 'mongoose';


@Schema()
export class User extends Document {

@Prop({required: true, default: ObjectId})
_id!: ObjectId;

@Prop({required: true})
name!: String;

@Prop({ required: true, unique: true })
email!: string;

@Prop({required: true })
password!: String;

@Prop({required: true, enum: Role, default: Role.USER })
role!: string;

@Prop({required: true })
salt!: string;

@Prop({required: false })
randomNumber?: number;

@Prop({ required: false })
pays?: string;

@Prop({ required: false })
toClientDestination?: string;

@Prop({ required: false })
addressPostal?: string;

@Prop({ required: false })
ville?: string;

@Prop({ required: false })
codePostal?: number;

@Prop({ required: false })
numTel?: number;


}








export const UserSchema = SchemaFactory.createForClass(User);