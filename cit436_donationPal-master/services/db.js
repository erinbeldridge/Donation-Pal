const MongoClient = require('mongodb').MongoClient;

class MongoConnection {
 constructor () {
     const uri = process.env.MONGO_CONNECTION_STRING;
     this.client = new MongoClient( uri, {useUnifiedTopology: true});
 }

 async init() {
     await this.client.connect();
     console.log('Connected to the database!');

     const dbName = 'DonationPal';
     this.db = this.client.db(dbName);

 }

}

module.exports = new MongoConnection();
