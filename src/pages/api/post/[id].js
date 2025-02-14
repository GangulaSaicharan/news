import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    dbConnect
    const { id } = req.query
    try {
      const data = await post.findById(id)
      res.status(200).json({ success: true, message: 'Post fetched successfully', data: data })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching post', error: error.message })
    }
    // Respond with actual data
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
