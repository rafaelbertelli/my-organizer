import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

// Source : https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      connectTimeoutMS: 2000, // checar se aqui controla mesmo o timeout
      serverSelectionTimeoutMS: 2000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
