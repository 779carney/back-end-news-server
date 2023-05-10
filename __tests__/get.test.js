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
                expect(response.body.topics[0].hasOwnProperty('description')).toBe(true)
            })
    })
})
describe('/api/topics/invalidendpoint', () => {
    test('to GET correct error message when the user puts an invalid end point', () => {
        return request(app)
            .get('/api/topics/invalidendpoint')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('not found');
            })
    })
})
describe('/api', () => {
    test('to GET an json object containing a description of the end points, what queries can be made and an example response', () => {
        return request(app)
            .get('/api/')
            .expect(200)
            .then((response) => {
                const apiEpObject=response.body.endPointData["GET /api"];
                expect(apiEpObject.hasOwnProperty('description')).toBe(true);
                const topicsEpObject = response.body.endPointData["GET /api/topics"];
                expect(typeof topicsEpObject).toEqual('object');
                expect(topicsEpObject.hasOwnProperty('description')).toBe(true);
                expect(topicsEpObject.hasOwnProperty('queries')).toBe(true);
                expect(topicsEpObject.hasOwnProperty('exampleResponse')).toBe(true);
                expect(Array.isArray(topicsEpObject.queries)).toBe(true);
                expect(typeof topicsEpObject.exampleResponse).toBe('object')
                const articlesEpObject =response.body.endPointData["GET /api/articles"];
                expect(typeof articlesEpObject).toEqual('object');
                expect(articlesEpObject.hasOwnProperty('description')).toBe(true);
                expect(articlesEpObject.hasOwnProperty('queries')).toBe(true);
                expect(articlesEpObject.hasOwnProperty('exampleResponse')).toBe(true);
                expect(Array.isArray(articlesEpObject.queries)).toBe(true);
                expect(typeof articlesEpObject.exampleResponse).toBe('object')

            })

    })
})