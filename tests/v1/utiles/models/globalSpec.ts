import request from 'supertest';
import app from '../../../../src/app';
import { User } from '../../../../src/v1/models/auth.model';
import globalModel from '../../../../src/v1/models/global.model';


describe('::::> Test User', () => {
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it(' Request /api/v1/auth/register should return token and an instance of an Object', async () => {
        const result = await request(app)
            .post('/api/v1/auth/register')
            .send({ firstname: 'JOB', lastname: 'ROW', username: 'thil@gmai', email: 'thil@gmai.com', password: 'admin123', password_confirmation: 'admin123' });

        expect(result.body.success).toEqual(true);
        expect(result.body.data).toBeInstanceOf(Object);
        expect(result.body.data.token).toBeInstanceOf(String);
        expect(result.status).toEqual(201);
    });
    it(' Request /api/v1/auth/register should return token and an instance of an Object', async () => {
        const result = await request(app)
            .post('/api/v1/auth/register')
            .send({ firstname: 'JOB', lastname: 'ROW', username: 'thil@gmai', email: 'thil@gmai.com', password: 'admin123', password_confirmation: 'admin123' });
        console.log(result.status, result.statusCode);

        expect(result.body.success).toEqual(false);
        expect(result.body.message).toBeInstanceOf(String);
        expect(result.status).toEqual(400);
    });


    // it('Request /api/v1/user/ should return status 200 and an array', async () => {
    //     const register = await request(app)
    //         .post('/api/v1/user/register')
    //         .send({ firstName: 'JOB', lastName: 'ROW', email: 'thij@gmai.com', password: 'password', role: 'admin' });
    //     const token = register.body.response[0].token;
    //     const result = await request(app)
    //         .get('/api/v1/user/')
    //         .send({ 'token': token });
    //     expect(result.body.statusCode).toBe(200);
    //     expect(result.body.response).toBeInstanceOf(Array);
    // });
    // it('Request /api/v1/user/ should return status 403 - unautheticated', async () => {
    //     const result = await request(app)
    //         .get('/api/v1/user/');
    //     expect(result.status).toBe(403);
    // });
    // it('Request /api/v1/user/:id should return an array of a single user', async () => {
    //     const register = await request(app)
    //         .post('/api/v1/user/register')
    //         .send({ firstName: 'JOB', lastName: 'ROW', email: 'thl@gmai.com', password: 'password', role: 'admin' });
    //     const token = register.body.response[0].token;
    //     const result = await request(app)
    //         .get('/api/v1/user/1')
    //         .send({ 'token': token });
    //     expect(result.body.statusCode).toBe(200);
    //     expect(result.body.response).toBeInstanceOf(Array);

    // });
    // it('Request /api/v1/user/login should return status 200 and token', async () => {
    //     const result = await request(app)
    //         .post('/api/v1/user/login')
    //         .send({ email: 'thil@gmai.com', password: 'password' });

    //     expect(result.body.statusCode).toBe(200);
    //     expect(result.body.response).toBeInstanceOf(Array);
    //     expect(result.body.response[0].token).toBeInstanceOf(String);

    // });
    // it(' Request /api/v1/user/ should return  deleted user ', async () => {
    //     const login = await request(app)
    //         .post('/api/v1/user/login')
    //         .send({ email: 'thil@gmai.com', password: 'password' });
    //     const token = login.body.response[0].token;
    //     const result = await request(app)
    //         .get('/api/v1/user/1')
    //         .send({ 'token': token });
    //     expect(result.body.statusCode).toBe(200);
    //     expect(result.body.response).toBeInstanceOf(Array);
    // });
    // it('Request * should return status 404', async () => {
    //     const result = await request(app).get('/');
    //     expect(result.status).toBe(404);
    // });
});

