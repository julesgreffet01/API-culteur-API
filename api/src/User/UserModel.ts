import {Role} from "./RoleModel"

export class User {
    
    Id: number;
    Username: string;
    Password: string;
    Name: string;
    Role: Role;

    constructor(Id: number, Username: string , Password: string ,Name: string , Role: Role){
        this.Id = Id
        this.Username = Username
        this.Password = Password
        this.Name = Name
        this.Role = Role
    }
}