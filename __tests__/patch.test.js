const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const app = require('../app');


beforeEach(() => seed(data))
afterAll(() => db.end())


describe('PATCH /api/articles/:article_id', () => {
    test('GET - STATUS:200 - to PATCH a specific article using the article_id, sending an object with the key of inc_votes and the value of how many votes to be increased or decreased by. then returning the newly updated article', () => {
        return request(app)
            .patch('/api/articles/5')
            .send({ inc_votes: 10 })
            .expect(200)
            .then((response) => {
                const updatedArticle = response.body.article
                expect(updatedArticle.votes).toBe(10);
            })
    })
    test('GET - STATUS:400 - Responds with correct error message if the user trys to add the votes on with an empty object', () => {
        return request(app)
            .patch('/api/articles/5')
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request');
            })
    })
    test('GET - STATUS:200 - Responds with correct error message when an article id is valid but doesnt exist when patching the votes', () => {
        return request(app)
            .patch('/api/articles/50000')
            .send({ inc_votes: 10 })
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('not found')
            })
    })
    test('GET - STATUS:400 - Responds with correct error message if the artcle id is invalid', ()=>{
        return request(app)
        .patch('/api/articles/invalid')
        .send({ inc_votes: 10 })
        .expect(400)
        .then((response)=>{
            expect(response.body.msg).toEqual('invalid request');
        })
    })
    test('check the endpoints.json file has been updated ', () => {
        return request(app)
            .get('/api/')
            .expect(200)
            .then((response) => {
                const epObject = response.body.endPointData["PATCH /api/articles/:article_id"];
                expect(typeof epObject).toEqual('object');
                expect(epObject.hasOwnProperty('description')).toBe(true);
                expect(epObject.hasOwnProperty('queries')).toBe(true);
                expect(epObject.hasOwnProperty('exampleResponse')).toBe(true);
        
            })
    })
})