import { Inject, Injectable} from '@nestjs/common';



import * as sendGrid from '@sendgrid/mail';
import { USER_ACCESS_MONGODB } from  '../../../package/config/constantes/user/user'  ;
import { UserAccessMongoDB } from '../../models/services/accessDB/users/userAccessDB';



@Injectable()
export class EmailService {

    constructor(@Inject(USER_ACCESS_MONGODB) private readonly db: UserAccessMongoDB ){
        this.resetKeySendGrid();
    }

    private resetKeySendGrid(){
        sendGrid.setApiKey(process.env.API_KEY);
    }
    
    
    
    async send(email: string, name: string, randNumber: number){
        await sendGrid.send({
            to: email,
            from: "mohammed.bouajaja@etu.u-pec.fr",
            subject: "Forgot password",
            text: `Bonjour`,
            html: `<h1> Bonjour ${name} </h1>
            <p> Nous avons reçu une demande réinitialisation de votre mot de passe </p>
            <p> Entrez le code de réinitialisation du mot de passe suivant : ${ randNumber } </p>`
        })
    }


}