export class AdapterSymfony {
    private baseUrlService = 'http://server_web_api-culteur:80'
    async loginWithJwt(username: string, password: string): Promise<string> {
        const reqToSymfony: {token?: string, error?: string} = await fetch(this.baseUrlService+ '/auth/jwt', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }).then(res => res.json());
        console.log(reqToSymfony);
        if(reqToSymfony.error === undefined){
            return reqToSymfony.token!
        }
        throw new Error(reqToSymfony.error)
    }
}