const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const app = require('../app');


beforeEach(() => seed(data))
afterAll(() => db.end())


describe('/api/articles/:article_id/comments', () => {
    test(' to POST an object containing a username and body and return with a posted comment', () => {
        return request(app)
            .post('/api/articles/4/comments')
            .send({ username: 'butter_bridge', body: 'nice article' })
            .expect(201)
            .then((response)=>{
const commentObject = response.body.comment;
expect(typeof commentObject).toBe('object')
expect(commentObject.hasOwnProperty('author')).toBe(true);
expect(commentObject.hasOwnProperty('body')).toBe(true);
expect(commentObject.author).toBe('butter_bridge');
expect(commentObject.body).toBe('nice article');
            })
    })
    test('to GET status 400 if try to post an empty comments object', ()=>{
return request(app)
.post('/api/articles/4/comments')
.send({})
.expect(400)
.then((response)=>{
    expect(response.body.msg).toEqual('invalid request')
})
    })
    test(' to GET status 404 if try to post a comment to article that doesnt exist', ()=>{
        return request(app)
        .post('/api/articles/400000/comments')
        .send({ username: 'butter_bridge', body: 'nice article' })
        .expect(404)
        .then((response)=>{
            expect(response.body.msg).toEqual('not found')
        })
    })
    test('to GET a status 400 and correct error message when an invalid article id is selected when posting a comment', () => {
        return request(app)
            .post('/api/articles/invalid/comments')
            .send({ username: 'butter_bridge', body: 'nice article' })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test('to GET a status 404 and correct error message when a user does not exist when posting a comment ', () => {
        return request(app)
            .post('/api/articles/4/comments')
            .send({ username: 'elle', body: 'nice article' })
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('user not found')
            })

    })
    test('check the endpoints.json file has been updated ', () => {
        return request(app)
            .get('/api/')
            .expect(200)
            .then((response) => {
                const epObject = response.body.endPointData["POST /api/articles/:article_id/comments"];
                expect(typeof epObject).toEqual('object');
                expect(epObject.hasOwnProperty('description')).toBe(true);
                expect(epObject.hasOwnProperty('queries')).toBe(true);
                expect(epObject.hasOwnProperty('exampleResponse')).toBe(true);
        
            })
    })
})
