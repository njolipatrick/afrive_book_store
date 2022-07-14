// import request from 'supertest';
// import app from '../../../../src/app';
// import { User } from '../../../../src/v1/models/auth.model';
// import globalModel from '../../../../src/v1/models/global.model';

// describe('::::>Test Global Model', async () => {
//     let originalTimeout: number;

//     beforeAll(async () => {
//         originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     });

//     afterAll(() => {
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//     });

//     it('Check Model should return true if found and falsy if not found', async () => {
//         const CheckUser = await globalModel.CHECKMODEL('USERS', 'id', 1);
//         if (CheckUser) {
//             expect(CheckUser).toBeTruthy();
//         } else {
//             expect(CheckUser).toBeFalsy();
//         }
//     });

//     it('Find All should return an array of available users', async () => {
//         const findall: User[] = await globalModel.FINDALL('USERS', 10);

//         expect(findall).toBeInstanceOf(Array);
//     });

//     it('Find One should return an Object of user', async () => {
//         const findone: User = await globalModel.FINDONE('USERS', 'id', 10);
//         expect(findone).toBeInstanceOf(Object);
//     });

//     it('Find Where should return an Array of Users', async () => {
//         const findwhere: User[] = await globalModel.FINDWHERE('USERS', 'id', 1);
//         expect(findwhere).toBeInstanceOf(Array);
//     });

//     it('Find All should return an Array of Users', async () => {
//         const findall: User[] = await globalModel.FINDALL('USERS', 10);
//         expect(findall).toBeInstanceOf(Array);
//     });
// });