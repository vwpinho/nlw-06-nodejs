import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"
import { classToPlain } from "class-transformer";


class ListUserService {
    async execute(){
        const userRepository = getCustomRepository(UsersRepositories);

        const users = await userRepository.find();

        return classToPlain(users);
    }
}

export { ListUserService };