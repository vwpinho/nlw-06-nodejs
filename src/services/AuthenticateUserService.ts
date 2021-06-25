import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign, TokenExpiredError } from "jsonwebtoken";
interface IAuthenticateRequest {
    email: string;
    password: string;
}


class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) { 
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({email});

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email
        }, "b9af084efc632c78b79db3d4b69c0aac", {
            subject: user.id,
            expiresIn: "1d"
        }
        );

        return token;
    }
}

export {AuthenticateUserService}; 