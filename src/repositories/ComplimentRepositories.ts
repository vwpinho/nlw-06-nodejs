import { EntityRepository, Repository } from "typeorm";
import { Compliments } from "../entities/Compliment";


@EntityRepository(Compliments)
class ComplimentRepositories extends Repository<Compliments>{}

export { ComplimentRepositories };