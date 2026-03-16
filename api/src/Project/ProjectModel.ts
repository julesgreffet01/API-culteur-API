import {User} from "./../User/UserModel"

export class Project {
    Id?: number;
    Name: string;
    CreatedAt?: string;
    User?: User;

    constructor(Id?: number, Name: string , CreatedAt?: string, User?: User){
        this.Id = Id
        this.Name = Name
        this.CreatedAt = CreatedAt
        this.User = User
    }

}