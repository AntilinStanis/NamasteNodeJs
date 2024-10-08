const {MongoClient} = require('mongodb');

const url = "mongodb+srv://antilin18:stanis200118@namastenode.n3yua.mongodb.net/";

const client = new MongoClient(url);

// NOTES
//  go to mongo db website
// create a free mo cluster
// create a user
//  get the connection string
// install mongo db compass
// create a connection from code
//  documents crud operation

const dbName = "HelloWorld";

async function main() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');

    // insert more  documents

    // const insertResult = await collection.insertMany([{
    //     firstName: 'antilin',
    //     secondName: 'stanis',
    //     location: 'manalikarai'
    // }, {
    //     firstName: 'Asha',
    //     secondName: 'laxmi',
    //     location: 'padanthalumoodu'
    // }, {
    //     secondName: 'lavanya',
    //     firstName: 'Anna',
    //     location: 'surandai'
    // }]);
    // console.log('Inserted documents =>', insertResult);

   // find all the data
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    return 'done.';
  }

  
main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());