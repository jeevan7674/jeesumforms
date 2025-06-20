import { MongoClient, GridFSBucket } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URI;
const dbName = 'jeevan';

let db;
let bucket;

async function connectToDB(callback = () => {}) {
    try {
        const client = new MongoClient(url); // No deprecated options
        await client.connect();

        db = client.db(dbName);

        bucket = new GridFSBucket(db, {
            bucketName: 'photos'
        });

        console.log('✅ Connected to MongoDB:', dbName);
        callback();
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
}

// Exporting a function to get DB or Bucket after connection
function getDB() {
    if (!db) throw new Error("Database not connected yet");
    return db;
}

function getBucket() {
    if (!bucket) throw new Error("Bucket not initialized yet");
    return bucket;
}

export {
    connectToDB,
    db,
    bucket,
    url
};
