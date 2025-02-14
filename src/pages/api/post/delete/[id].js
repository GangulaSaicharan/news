import { deleteFiles } from 'src/lib/cloudinary-upload'
import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function handler(req, res) {
  console.log('called delete')
  try {
    await dbConnect()
    const { id } = req.query
    const findPost = await post.findById(id)
    if (!findPost) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }
    await deleteFiles(findPost?.images)
    const deletedPost = await post.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Post deleted successfully', data: deletedPost })
  } catch (error) {
    console.error('Error deleting post:', error)
    res.status(500).json({ success: false, message: 'Error deleting post', error: error.message })
  }
}
