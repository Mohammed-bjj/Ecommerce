import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule   } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { UserAccessMongoDB } from 'src/infrastructure/output/models/services/accessDB/users/userAccessDB'
import { UserController } from '../../../input/api/user.controller'
import { User,UserSchema } from '../../../output/models/schema/user.schema'
import { UserService } from '../../../output/models/services/dataProcessing/users/userService'
import { USER_SERVICE, USER_ACCESS_MONGODB } from '../constantes/user/user';
import * as dotenv from 'dotenv';
import { EmailService } from '../../../output/web-services-externe/serviceMail/serviceSendGrid';
import { AuthMiddleware } from '../middleware/auth.middleware'


dotenv.config();
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret:process.env.SECRET,
            signOptions:{
                expiresIn:3600,
            }
        })
    ],
    providers: [ 
        {
            useClass: UserService,
            provide: USER_SERVICE,
        },
        {
            useClass: UserAccessMongoDB,
            provide: USER_ACCESS_MONGODB,
        },
        EmailService,
        AuthMiddleware,
    ],
    controllers: [ UserController ],
    exports: [USER_SERVICE,USER_ACCESS_MONGODB, AuthMiddleware, JwtModule],
})


export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(   
                    {path: '/users/updatePassWord', method: RequestMethod.PUT},
                    {path: '/users/updateProfile', method: RequestMethod.PATCH},
                    {path: '/users/updateAddress', method: RequestMethod.PUT},
                    {path: '/users/address', method: RequestMethod.GET},
                    {path: '/users/AddAdmin', method: RequestMethod.POST},
        )
    }
};