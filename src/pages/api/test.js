// import { clientPromise } from 'src/utility/mongodb'

import dbConnect from 'src/lib/mongodb'

// export default async function handler(req, res) {
//   try {
//     // Try connecting to MongoDB
//     const client = await clientPromise
//     console.log(client)
//     const db = client.db() // Default database (from connection string)

//     // Optionally, list all collections in the database
//     const collections = await db.listCollections().toArray()

//     res.status(200).json({
//       success: true,
//       message: 'Successfully connected to MongoDB!',
//       collections: collections.map(c => c.name) // List of collections
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to connect to MongoDB',
//       error: error.message
//     })
//   }
// }

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
