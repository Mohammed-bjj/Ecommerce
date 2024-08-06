export interface UpdatedUser{
    name: string;
    email: string;
    password?: string;
}



export interface UpdatedAdresse{
    pays:string,
    toClientDestination:string,
    addressPostal: string,
    ville: string,
    codePostal: number,
    numTel: number,
}