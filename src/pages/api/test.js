// import { clientPromise } from 'src/utility/mongodb'

import dbConnect from 'src/lib/mongodb'

export default async function handler(req, res) {
  try {
    // Connect to the database
    await dbConnect()

    // Add your query logic here (e.g., fetching posts)
    res.status(200).json({ success: true, message: 'Connected to MongoDB using Mongoose!' })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    res.status(500).json({ success: false, message: 'Database connection failed', error: error.message })
  }
}
