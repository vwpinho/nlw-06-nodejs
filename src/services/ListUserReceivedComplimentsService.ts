import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";



class ListUserReceivedComplimentsService {
    async execute(user_id){
        const complimentsRepository = getCustomRepository(ComplimentRepositories);

        const compliments = await complimentsRepository.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments;
    }
}

export { ListUserReceivedComplimentsService }