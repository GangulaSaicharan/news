// import { NextResponse } from 'next/server'

// const allowedOrigins = [process.env.BASE_URL, process.env.WEBSITE_URL, 'http://localhost:3000', 'http://localhost:3001']

// export function middleware(req) {
//   const origin = req.headers.get('origin') || null

//   // Check if the origin is allowed
//   if (allowedOrigins.includes(origin) || origin === null) {
//     const response = NextResponse.next()

//     // Set CORS headers
//     response.headers.set('Access-Control-Allow-Origin', origin || '*')
//     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//     response.headers.set(
//       'Access-Control-Allow-Headers',
//       'X-CSFR-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     response.headers.set('Access-Control-Allow-Credentials', 'true')

//     // Handle preflight (OPTIONS) requests
//     if (req.method === 'OPTIONS') {
//       return new NextResponse(null, { status: 204 }) // No content
//     }

//     return response
//   }

//   // Block requests from other origins
//   return NextResponse.json({ message: 'Origin not allowed' }, { status: 403 })
// }

// export const config = {
//   matcher: ['/api/:path*'] // Match API routes
// }

import { NextResponse } from 'next/server'

const allowedOrigins = [
  'https://sd4wd62q-3000.inc1.devtunnels.ms',
  'https://sd4wd62q-3001.inc1.devtunnels.ms',
  'http://localhost:3000',
  'http://localhost:3001'
]

// .filter(Boolean) // Remove undefined values

export function middleware(req) {
  const origin = req.headers.get('origin') || '*'

  // If the origin is allowed or it's a server-to-server request (no origin)
  if (allowedOrigins.includes(origin) || origin === '*') {
    // Handle OPTIONS preflight requests
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers':
            'X-CSFR-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          'Access-Control-Allow-Credentials': 'true'
        }
      })
    }

    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSFR-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    response.headers.set('Access-Control-Allow-Credentials', 'true')

    return response
  }

  // Block requests from unallowed origins
  return NextResponse.json({ message: 'Origin not allowed' }, { status: 403 })
}

export const config = {
  matcher: '/api/:path*' // Apply middleware to API routes
}
