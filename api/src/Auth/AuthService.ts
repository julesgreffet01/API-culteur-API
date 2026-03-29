import {AdapterSymfony} from "./AdapterSymfony";

export class AuthService {
    private adapterSymfony = new AdapterSymfony();
    async login(username: string, password: string): Promise<string> {
        try{
            return await this.adapterSymfony.loginWithJwt(username, password);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}