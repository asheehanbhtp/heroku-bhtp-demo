import * as axios from 'axios';
import { assert } from 'chai';
import { IMock, It, Mock } from 'typemoq';
import { StatusService } from './status.service';

describe('StatusService', () => {

    let service: StatusService;
    let req: IMock<axios.AxiosStatic>;

    beforeEach('Initialize StatusService', () => {
        req = Mock.ofType<axios.AxiosStatic>();
        req.setup((r) => r.get(It.isAnyString(), It.isAny()))
            .returns(() => Promise.resolve({ status: 200 }));
        service = new StatusService(req.object);
    });

    describe('isGoogleActive', () => {
        it('returns true if status is 200', async () => {
            const result = await service.isGoogleActive();

            assert.isTrue(result);
        });

        it('returns false if the status is not 200', async () => {
            req.reset();
            req.setup((r) => r.get(It.isAnyString(), It.isAny()))
                .returns(() => Promise.resolve({ status: 500 }));
            const result = await service.isGoogleActive();

            assert.isFalse(result);
        });

        it('returns false if the call fails', async () => {
            req.reset();
            req.setup((r) => r.get(It.isAnyString(), It.isAny())).throws(new Error('oops'));

            const result = await service.isGoogleActive();

            assert.isFalse(result);
        });
    });
});