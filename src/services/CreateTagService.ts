import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagRepositories";



class CreateTagService {

    async execute(name: string){
        const TagsRepository = getCustomRepository(TagsRepositories);

        if(!name){
            throw new Error("Name incorrect");
        }

        const tagAlreadyExists = await TagsRepository.findOne({name})
        
        if(tagAlreadyExists){
            throw new Error("Tag already exists");
        }

        const tag = TagsRepository.create({
            name
        });

        await TagsRepository.save(tag);

        return tag;
    }
}

export { CreateTagService }