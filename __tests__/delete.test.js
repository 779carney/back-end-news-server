const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const app = require('../app');


beforeEach(() => seed(data))
afterAll(() => db.end())


describe('DElETE /api/comments/:comment_id', () => {
    test('GET - STATUS:204 - This should delete the specific comment using the comment id and return no content', () => {
        return request(app)
            .delete('/api/comments/1')
            .expect(204)
            .then(() => {
                return request(app)
                    .get('/api/comments/1')
                    .expect(404)
                    .then((response) => {
                        expect(response.body.msg).toBe("not found");
                    });
            })

    })
    test('GET - STATUS:400 - Responds with correct error message when an invalid article id is selected', () => {
        return request(app)
            .delete('/api/comments/invalid')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test('GET - STATUS:404 - Responds with correct error message when an  comment id is valid but does not exist', () => {
        return request(app)
            .delete('/api/comments/500000')
            .expect(404)
            .then((response) => {
                console.log(response.body);
                expect(response.body.msg).toEqual('not found')
            })

    })
})