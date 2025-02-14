const firebaseAdmin = require('firebase-admin')

if (!process.env.FIREBASE_ADMIN_SDK) {
  throw new Error('FIREBASE_ADMIN_SDK is not set in environment variables')
}

if (!firebaseAdmin.apps.length) {
  console.log('Firebase Admin SDK initialized')
  console.log('FIREBASE_ADMIN_SDK:', process.env.FIREBASE_ADMIN_SDK)
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK))
  })
}

export default firebaseAdmin
