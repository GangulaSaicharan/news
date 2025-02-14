import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function handler(req, res) {
  const { id } = req.query // Get dynamic `id` from the query parameters

  if (req.method === 'PATCH') {
    try {
      // Establish DB connection
      await dbConnect()

      // Extract the status from the request body
      const { status } = req.body

      // Validate status input (optional but recommended)
      if (!['draft', 'published', 'archived'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' })
      }

      // Find the post by ID and update its status
      const updatedPost = await post.findByIdAndUpdate(
        id, // Post ID to update
        { status }, // Update status field
        { new: true } // Return the updated document
      )

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' })
      }

      // Return the updated post
      return res.status(200).json({
        success: true,
        message: `Post ${status} updated successfully`,
        data: updatedPost
      })
    } catch (error) {
      console.error('Error updating post:', error)
      return res.status(500).json({
        success: false,
        message: 'Error updating post',
        error: error.message
      })
    }
  } else {
    // If the method is not PATCH, return 405 Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
