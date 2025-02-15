import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local')
}

/**
 * Global variable to store the connection
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    console.log(MONGODB_URI, 'MONGODB_URI')

    cached.promise = mongoose.connect(MONGODB_URI, options).then(mongoose => {
      console.log('MongoDB connected successfully!')
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
