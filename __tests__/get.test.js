const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const app = require('../app');


beforeEach(() => seed(data))
afterAll(() => db.end())

describe('/api/topics', () => {
    test('to GET an array of objects containing the following keys: slug, description', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                expect(response.body.topics.length).toBe(3)
                expect(response.body.topics[0].hasOwnProperty('slug')).toBe(true)

            })
    })
})
describe('/api/topics/invalidendpoint', ()=>{
    test('to GET correct error message when the user puts an invalid end point', ()=>{
        return request(app)
        .get('/api/topics/invalidendpoint')
        .expect(404)
        .then((response)=>{
            expect(response.text).toEqual('not found');
        })
    })
})