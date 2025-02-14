import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function handler(req, res) {
  console.log('fetching posts')
  const { category } = req.query
  console.log(category)
  try {
    await dbConnect()
    const posts = await post.find({
      status: 'published',
      category: category
    })
    console.log('posts', posts)
    res.status(200).json({ success: true, message: 'Post fetched successfully', data: posts })
  } catch (error) {
    console.error('Error fetching post:', error)
    res.status(500).json({ success: false, message: 'Error fetching post', error: error.message })
  }
}

// export default function handler(req, res) {
//   const { category } = req.query

//   if (!category) {
//     return res.status(400).json({ error: 'Category is required.' })
//   }

//   // Fetch posts logic here
//   res.status(200).json({ data: `Posts for category: ${category}` })
// }
