import { Product } from './product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, SchemaTypes } from 'mongoose';


@Schema()
export class Panier extends Document {


@Prop({required: true, type:SchemaTypes.ObjectId, ref:'Product'})
idProduct!: ObjectId;

@Prop({required: true, type:SchemaTypes.ObjectId, ref:'User' })
idUser!: ObjectId;


}








export const PanierSchema = SchemaFactory.createForClass(Panier);