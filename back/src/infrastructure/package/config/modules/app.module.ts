import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module'
import { ProductModule } from './product.module';
import { PanierModule } from './panier.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {dbName: 'test'}),
    UserModule,
    ProductModule,
    PanierModule
  ],
  
})
export class AppModule {}
