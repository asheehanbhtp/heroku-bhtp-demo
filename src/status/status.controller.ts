import { Get, JsonController } from 'routing-controllers';
import { StatusService } from './status.service';

@JsonController('/status')
export class StatusController {
    constructor(private statusService: StatusService) { }

    @Get()
    public async getStatus(): Promise<object> {
        let statusSuccessful: boolean;
        try {
            statusSuccessful = await this.statusService.isGoogleActive();
        }
        catch (err) {
            statusSuccessful = false;
        }

        return {
            app: 'heroku-bhtp-demo',
            deloreanSpeed: '89 mph',
            google: statusSuccessful
        };
    }

}