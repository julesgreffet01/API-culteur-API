import {Role} from "./RoleModel"

export class User {
    
    id: number;
    username: string;
    password: string;
    name: string;
    Role: Role;

    constructor(id: number, username: string , password: string ,name: string , Role: Role){
        this.id = id
        this.username = username
        this.password = password
        this.name = name
        this.Role = Role
    }
}