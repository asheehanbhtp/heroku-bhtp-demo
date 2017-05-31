import * as axios from 'axios';
import { Require, Service } from 'typedi';

@Service()
export class StatusService {
    constructor(@Require('axios') private axios: axios.AxiosStatic) { }

    public async isGoogleActive(): Promise<boolean> {
        try {
            const resp: axios.AxiosResponse = await this.axios.get('https://www.google.com/search?q=bhtp');
            return resp.status === 200;
        }
        catch (err) {
            return false;
        }
    }
}