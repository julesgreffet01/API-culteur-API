import {User} from "./../User/UserModel"

export class Project {
    id: number;
    name: string;
    created_at: Date;
    User: User;

    constructor(id: number, name: string , created_at: Date, User: User){
        this.id = id
        this.name = name
        this.created_at = created_at
        this.User = User
    }
}