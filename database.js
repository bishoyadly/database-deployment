const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = process.env.MONGO_DB_URL;

async function dbConnect() {
    try {
        const client = await MongoClient.connect(connectionURL, {useUrlParser: true});
        return client.db();
    } catch (error) {
        console.log('Database connection error : ', error);
    }
}

module.exports = dbConnect;