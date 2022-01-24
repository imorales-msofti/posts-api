"use strict";
// Import the dependency.
const clientPromise = require('./mongodb-client');
// Handler
module.exports.lambdaHandler = async function (event, context) {
  // Get the MongoClient by calling await on the connection promise. Because
  // this is a promise, it will only resolve once.
  const client = await clientPromise;
  // Use the connection to return the name of the connected database.

  // console.log(event.resource);

  // console.log('Found documents =>', findResult);

  let response = "";

  console.log(event.httpMethod);
  console.log(event.body);

  if (event.resource === '/posts' && event.httpMethod == 'GET') {
    response = await getPosts(client);
  }

  else if (event.resource === '/posts' && event.httpMethod == 'POST') {
    let _post = JSON.parse(event.body);

    response = await insertPost(client, _post);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST"
    },
    body: JSON.stringify({
      data: response,
    })
  }

}

function getPosts(dbClient) {
  const posts = dbClient.db().collection('posts');

  return posts.find({}).toArray();
}

function insertPost(dbClient, post) {
  const posts = dbClient.db().collection('posts');

  return posts.insertOne(post);
}