import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Respond with actual data
    res.status(200).json({ message: 'Posts fetched successfully!' })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
