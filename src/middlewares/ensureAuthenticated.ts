import { Request, Response, NextFunction } from "express";
import { RepositoryNotTreeError } from "typeorm";
import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string;
}
export function ensureAuthenticated(
    request:Request, 
    response:Response, 
    next:NextFunction) {
        const authtoken = request.headers.authorization

        if(!authtoken){
            return response.status(401).end();
        }
        
        const [,token] = authtoken.split(" ");

        try {
            const { sub } = verify(token, "b9af084efc632c78b79db3d4b69c0aac") as IPayload;
            request.user_id = sub;
            return next();
        } catch (err) {
            return response.status(401).end();
        }

}