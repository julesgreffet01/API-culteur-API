import { UserRepository } from './UserRepository'
import { User } from './UserModel'
import { UserFilter } from './UserFilter';
export class UserService {

    private userRepo = new UserRepository(); 

    async GetById(id: number): Promise<User | undefined> {
        return await this.userRepo.GetById(id) ?? undefined;
    }

    async GetAll(filter?: UserFilter): Promise<User[]>{
        return await this.userRepo.GetAll(filter)
    }
} 