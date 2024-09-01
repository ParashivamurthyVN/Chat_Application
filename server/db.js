import { MongoClient } from "mongodb";

let dbConnect;

const connectToDb = async (cb) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        dbConnect = client.db('ChatApp');
        console.log('Connected to MongoDB');
        cb(); // Invoke the callback once the connection is successful
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        cb(err); // Pass the error to the callback
    }
}

const getDb = () => dbConnect; // Simply return the dbConnect variable

export { connectToDb, getDb };