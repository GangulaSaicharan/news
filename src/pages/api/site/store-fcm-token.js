import dbConnect from 'src/lib/mongodb'
import fcmToken from 'src/models/fcmToken'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  console.log('Request from store FCM token', req.body)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { token } = req.body

    await dbConnect()
    console.log('Token:', token)

    if (!token) {
      return res.status(400).json({ error: 'Missing FCM token' })
    }

    // 🔍 Check if the token already exists
    let existingToken = await fcmToken.findOne({ token })

    if (existingToken) {
      console.log('Token already exists, skipping save.')
      return res.status(200).json({
        success: true,
        userUuid: '',
        message: 'FCM token already stored'
      })
    }

    // ✅ Store the new token
    const newToken = new fcmToken({
      token: token
    })
    await newToken.save()

    return res.status(200).json({
      success: true,
      userUuid: '',
      message: 'FCM token stored successfully'
    })
  } catch (error) {
    console.error('Error storing FCM token:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
