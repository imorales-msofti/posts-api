'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests Get Post', function () {
    it('verifies successful response', async () => {
        
        event = {
            httpMethod : 'GET',
            resource : '/posts',
        }

        const result = await app.lambdaHandler(event, context);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response.data).to.be.an('array');
    });
});

describe('Tests Add New Post', function () {
    it('verifies successful response', async () => {
        
        let newPost = {
            caption : 'caption test 001',
            description : 'description test 001',
        }

        event = {
            httpMethod : 'POST',
            resource : '/posts',
            body: JSON.stringify(newPost),
        }

        const result = await app.lambdaHandler(event, context);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        
        expect(response.data).to.be.an('object');
    });
});