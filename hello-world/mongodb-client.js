"use strict";
// Import the dependency.
const { MongoClient } = require('mongodb');
// Export a module-scoped MongoClient promise. By doing this in a separate
// module, the client can be shared across functions.

const uri = "mongodb+srv://admin:TkcKEnJDR4uZ@cluster0.gq2kj.mongodb.net/postsapp?retryWrites=true&w=majority";
// process.env.MONGODB_URI

const client = new MongoClient(uri,
    { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = client.connect();