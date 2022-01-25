"use strict";

const { ObjectId } = require('mongodb');

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

  // console.log(event.httpMethod);
  // console.log(event.body);

  if (event.resource === '/posts' && event.httpMethod == 'GET') {
    response = await getPosts(client);
  }
  else if (event.resource === '/posts' && event.httpMethod == 'POST') {
    let _post = JSON.parse(event.body);

    response = await insertPost(client, _post);
  }
  else if (event.resource === '/posts/{id}' && event.httpMethod == 'DELETE') {
        
    response = await deletePost(client, event.pathParameters.id);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
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

function deletePost(dbClient, postId) {
  const posts = dbClient.db().collection('posts');

  return posts.deleteOne({ _id: new ObjectId(postId) });
}