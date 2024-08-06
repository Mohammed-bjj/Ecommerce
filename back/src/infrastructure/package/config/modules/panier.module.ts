import { ProductModule } from './product.module';
import { Panier, PanierSchema } from '../../../output/models/schema/panier.schema';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule   } from '@nestjs/mongoose'
import { UserModule } from '../../config/modules/user.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { PANIER_ACCESS_MONGODB, PANIER_SERVICE } from '../constantes/panier/panierConstant';
import { PanierController } from 'src/infrastructure/input/api/panier.controller';
import { PanierService } from 'src/domain/panier/panierService';
import { PanierAccessMongoDB } from 'src/infrastructure/output/models/services/accessDB/panier/panierAccessDB';


@Module({

    imports: [  UserModule,
        MongooseModule.forFeature([
            { name: Panier.name, schema: PanierSchema},
        ])      ,
        ProductModule,          
    ],
    providers: [
        {
            useClass: PanierService,
            provide: PANIER_SERVICE,
        },
        {
            useClass: PanierAccessMongoDB,
            provide: PANIER_ACCESS_MONGODB,
        },
    ],
    controllers: [ PanierController ]
})
export class PanierModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(   
                    {path: '/panier/register', method: RequestMethod.POST},
                    {path: '/panier/:id', method: RequestMethod.DELETE},
                    {path: '/panier', method: RequestMethod.GET},
        )
    }
};
