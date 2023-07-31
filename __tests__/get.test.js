const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const app = require('../app');


beforeEach(() => seed(data))
afterAll(() => db.end())

describe('GET /api/topics', () => {

    test('GET - STATUS:200 - Responds with an array of objects containing the following keys: slug, description', () => {



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
describe('GET /api/topics/invalidendpoint', () => {

    test('GET - STATUS:404 - Responds with correct error message when the user puts an invalid end point', () => {



        return request(app)
            .get('/api/topics/invalidendpoint')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('not found');
            })
    })
})
describe('GET /api', () => {

    test('GET - STATUS:200 - Responds with a json object containing a description of the end points, what queries can be made and an example response', () => {

        return request(app)
            .get('/api/')
            .expect(200)
            .then((response) => {
                const apiEpObject = response.body.endPointData["GET /api"];
                expect(apiEpObject.hasOwnProperty('description')).toBe(true);
                const epObject = response.body.endPointData["GET /api/topics"];
                expect(typeof epObject).toEqual('object');
                expect(epObject.hasOwnProperty('description')).toBe(true);
                expect(epObject.hasOwnProperty('queries')).toBe(true);
                expect(epObject.hasOwnProperty('exampleResponse')).toBe(true);
                expect(Array.isArray(epObject.queries)).toBe(true);
                expect(typeof epObject.exampleResponse).toBe('object')
                const articlesEpObject = response.body.endPointData["GET /api/articles"];
                expect(typeof articlesEpObject).toEqual('object');
                expect(articlesEpObject.hasOwnProperty('description')).toBe(true);
                expect(articlesEpObject.hasOwnProperty('queries')).toBe(true);
                expect(articlesEpObject.hasOwnProperty('exampleResponse')).toBe(true);
                expect(Array.isArray(articlesEpObject.queries)).toBe(true);
                expect(typeof articlesEpObject.exampleResponse).toBe('object')

            })

    })
})
describe('GET /api/articles/:article_id', () => {

    test('GET - STATUS:200 - Responds with a article object containing the following properties: author, title, article_id, body, topic, created_at, votes, article_img_url', () => {


        return request(app)
            .get('/api/articles/9')
            .expect(200)
            .then((response) => {
                const articleObject = response.body.article
                expect(articleObject.article_id).toBe(9);
                expect(articleObject.hasOwnProperty('author')).toBe(true);
                expect(articleObject.hasOwnProperty('title')).toBe(true);
                expect(articleObject.hasOwnProperty('article_id')).toBe(true);
                expect(articleObject.hasOwnProperty('body')).toBe(true);
                expect(articleObject.hasOwnProperty('topic')).toBe(true);
                expect(articleObject.hasOwnProperty('created_at')).toBe(true);
                expect(articleObject.hasOwnProperty('votes')).toBe(true);
                expect(articleObject.hasOwnProperty('article_img_url')).toBe(true);
            })
    })
    test('GET - STATUS:400 - Responds with correct error message when an invalid article id is selected', () => {
        return request(app)
            .get('/api/articles/invalid')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test('GET - STATUS:404 - Responds with correct error message when an  article id is valid but does not exist', () => {
        return request(app)
            .get('/api/articles/500000')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('not found')
            })

    })
    test('GET - STATUS:200 - check the endpoints.json file has been updated ', () => {
        return request(app)
            .get('/api/')
            .expect(200)
            .then((response) => {
                const epObject = response.body.endPointData["GET /api/articles/:article_id"];
                expect(typeof epObject).toEqual('object');
                expect(epObject.hasOwnProperty('description')).toBe(true);
                expect(epObject.hasOwnProperty('queries')).toBe(true);
                expect(epObject.hasOwnProperty('exampleResponse')).toBe(true);
                expect(Array.isArray(epObject.queries)).toBe(true);
                expect(typeof epObject.exampleResponse).toBe('object')


            })
    })
})
describe('GET /api/articles', () => {

    test(`GET - STATUS:200 - Responds with an array containing article objects containing the following properties:author, title, article_id, body, topic, created_at, votes, article_img_url, comment_count. the articles should be sorted by date in descending order.  `, () => {


        return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                const articleArray = response.body.articles;
                expect(articleArray.forEach((article) => {
                    expect(typeof article.author).toBe('string');
                    expect(typeof article.title).toBe('string');
                    expect(typeof article.article_id).toBe('number');
                    expect(typeof article.topic).toBe('string');
                    expect(typeof article.created_at).toBe('string');
                    expect(typeof article.votes).toBe('number');
                    expect(typeof article.article_img_url).toBe('string');
                    expect(typeof article.comment_count).toBe('number');
                }))
            })
    }
    )
    test('GET - STATUS:404 - Responds with an correct error message if the article array is an empty array', () => {
        return request(app)
            .get('/api/articlesinvalid')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('not found')
            })
    })
})
describe('GET /api/articles/:article_id/comments', () => {

    test('GET - STATUS:200 - Responds with an an array of comments for the given article_id of which each comment should have the following properties: comment_id, votes, created_at, author, body, article_id', () => {


        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {
                const commentsArray = response.body.comments;
                expect(commentsArray.length).toBe(11);
                expect(commentsArray.forEach((comment) => {
                    expect(typeof comment.comment_id).toBe('number');
                    expect(typeof comment.body).toBe('string');
                    expect(typeof comment.article_id).toBe('number');
                    expect(typeof comment.author).toBe('string');
                    expect(typeof comment.votes).toBe('number');
                    expect(typeof comment.created_at).toBe('string');
                }))
            })
    })
    test('GET - STATUS:400 - Responds with correct error message when an invalid article id is selected', () => {
        return request(app)
            .get('/api/articles/invalid/comments')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })

    test('GET - STATUS:200 - Responds with an empty array when article id is valid but has no comments ', () => {
        return request(app)
            .get('/api/articles/8/comments')
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toEqual([])
            })

    })
    test('GET - STATUS:200 - check the endpoints.json file has been updated ', () => {



        return request(app)
            .get('/api/')
            .expect(200)
            .then((response) => {
                const epObject = response.body.endPointData["GET /api/articles/:article_id/comments"];
                expect(typeof epObject).toEqual('object');
                expect(epObject.hasOwnProperty('description')).toBe(true);
                expect(epObject.hasOwnProperty('queries')).toBe(true);
                expect(epObject.hasOwnProperty('exampleResponse')).toBe(true);
                expect(Array.isArray(epObject.queries)).toBe(true);
                expect(Array.isArray(epObject.exampleResponse)).toBe(true)


            })
    })
    test('GET - STATUS:404 - Responds with an correct error message if article_id is valid but there is no article', () => {
        return request(app)
            .get('/api/articles/5000/comments')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('no article found')
            })
    })

})

describe('GET /api/users', () => {

    test('GET - STATUS:200 - Responds with an array of user objects containing the following keys: username, name and avatar_url', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then((response) => {
                console.log(JSON.stringify(response.body.users[0]));
                expect(response.body.users.length).toBe(4)
                expect(response.body.users[0].hasOwnProperty('username')).toBe(true)
                expect(response.body.users[0].hasOwnProperty('name')).toBe(true)
                expect(response.body.users[0].hasOwnProperty('avatar_url')).toBe(true)
            })
    })
    test('GET - STATUS:404 - Responds with correct error message when the user puts an invalid end point', () => {
        return request(app)
            .get('/api/users/invalidendpoint')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('not found');
            })
    })
})

