import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function GET(req, res) {
  await dbConnect()
  try {
    const posts = await post.find().sort({
      createdAt: -1 // Sort by createdAt in descending order
    })
    console.log(res.headers, 'headers')

    return res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      data: posts
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    })
  }
}
