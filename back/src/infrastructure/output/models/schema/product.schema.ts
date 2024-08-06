import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, SchemaTypes } from 'mongoose';
import { CategoryType } from '../interfaces/products/IProductAccessDB';

@Schema()
export class Product extends Document {

@Prop({required: true, default: ObjectId})
_id!: ObjectId;

@Prop({required: true})
name!: String;

@Prop({ required: true})
description!: string;

@Prop({ required: true})
author!: string;

@Prop({required: true })
price!: String;

@Prop({required: true,enum: CategoryType})
category!: string;

}



export const ProductSchema = SchemaFactory.createForClass(Product);






