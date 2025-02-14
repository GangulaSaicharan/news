import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

//api/site/post
export default async function handler(req, res) {
  try {
    console.log('post called')
    await dbConnect()
    const { slug, category } = req.query
    console.log(slug, category)
    const data = await post.findOne({ slug, category })
    res.status(200).json({ success: true, message: 'Post fetched successfully', data: data })
  } catch (error) {
    console.error('Error fetching post:', error)
    res.status(500).json({ success: false, message: 'Error fetching post', error: error.message })
  }
}
