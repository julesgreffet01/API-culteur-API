import {User} from "./../User/UserModel"

export class Project {
    Id?: number;
    Name: string;
    CreatedAt?: string;
    User?: User;

constructor(Name: string, Id?: number, CreatedAt?: string, User?: User) {
        this.Id = Id
        this.Name = Name
        this.CreatedAt = CreatedAt
        this.User = User
    }

}