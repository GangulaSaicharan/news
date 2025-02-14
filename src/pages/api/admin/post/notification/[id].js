import firebaseAdmin from 'src/lib/firebase'
import dbConnect from 'src/lib/mongodb'
import fcmToken from 'src/models/fcmToken'
import post from 'src/models/post'

export default async function POST(req, res) {
  try {
    const id = req.query.id
    await dbConnect()

    const findPost = await post.findById(id)
    if (!findPost) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }

    const title = findPost.title
    const body = findPost.content
    const image = findPost.images[0].url
    const findTokens = await fcmToken.find()
    const tokens = findTokens.map(token => token.token)
    console.log(tokens, tokens)
    const message = {
      notification: {
        title,
        body,
        image
      },
      data: {
        url: `/${findPost.category}/${findPost.slug}` // Store URL in `data`
      },
      tokens // Array of FCM tokens
    }

    console.log(message)
    // await firebaseAdmin.messaging().sendMulticast(message)
    await firebaseAdmin.messaging().sendEachForMulticast(message)

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}
