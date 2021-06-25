import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"
import { UsersRepositories } from "../repositories/UserRepositories";


interface IComplimentRequest {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;
}

class CreateComplimentService {
    async execute({ user_sender, user_receiver, tag_id, message }: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentRepositories);
        const userRepository = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver){
            throw new Error("Incorrect User Receiver");
        }

        const userReceiverExists = await userRepository.findOne(user_receiver);
        
        if(!userReceiverExists){
            throw new Error("User Receiver does not exists")
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentRepository.save(compliment);

        return compliment;
        
    }
}

export { CreateComplimentService }