import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {ProductController} from '../../../input/api/product.controller';
import { MongooseModule   } from '@nestjs/mongoose'
import {Product, ProductSchema } from '../../../output/models/schema/product.schema';
import { UserModule } from '../../config/modules/user.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ProductAccessMongoDB } from '../../../output/models/services/accessDB/products/productAccessDB';
import {  ProductsService } from '../../../output/models/services/dataProcessing/products/productService';
import { PRODUCT_ACCESS_MONGODB, PRODUCT_SERVICE} from '../../config/constantes/product/constantProduct';
@Module({

    imports: [  UserModule,
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema},
        ])                
    ],
    providers: [
        {
            useClass: ProductsService,
            provide: PRODUCT_SERVICE,
        },
        {
            useClass: ProductAccessMongoDB,
            provide: PRODUCT_ACCESS_MONGODB,
        },
    ],
    controllers: [ ProductController ],
    exports: [MongooseModule]
})
export class ProductModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(   
                    {path: '/products/register', method: RequestMethod.POST},
                    {path: '/products/:id', method: RequestMethod.PUT},
                    {path: '/products/:id', method: RequestMethod.DELETE},
                    {path: '/products', method: RequestMethod.DELETE},
        )
    }
};
