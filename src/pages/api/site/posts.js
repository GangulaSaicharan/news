import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function handler(req, res) {
  console.log('fetching posts')
  try {
    await dbConnect()
    const posts = await post
      .find({
        status: 'published'
      })
      .sort({
        createdAt: -1 // Sort by createdAt in descending order
      })
    return res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      data: posts
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    res.status(500).json({ success: false, message: 'Error fetching post', error: error.message })
  }
}

// pages/api/site/posts.js
// pages/api/site/posts.js
// export default async function handler(req, res) {
//   console.log('calling ')
//   if (req.method === 'OPTIONS') {
//     // Respond to preflight request with CORS headers
//     res
//       .status(204)
//       .setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
//       .setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//       .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//       .setHeader('Access-Control-Max-Age', '86400') // Cache the preflight response for 1 day
//       .end()
//     return
//   }

//   if (req.method === 'GET') {
//     // Respond with actual data
//     res.status(200).json({ message: 'Posts fetched successfully!' })
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' })
//   }
// }
