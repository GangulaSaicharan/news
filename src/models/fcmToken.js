import mongoose from 'mongoose'

const FcmTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional
  userUuid: {
    type: String,
    unique: true
  },
  token: { type: String, required: true, unique: true },
  categories: [{ type: String, default: [] }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.FcmToken || mongoose.model('FcmToken', FcmTokenSchema)
