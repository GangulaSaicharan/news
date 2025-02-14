import React from 'react'
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
// import Link from 'src/@core/theme/overrides/link'
import Link from 'next/link' // Import Link from Next.js

const NoPostsCard = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        boxShadow: 3,
        marginTop: 4,
        borderRadius: 2,
        height: '100%'
      }}
    >
      <CardMedia
        component='img'
        sx={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', marginBottom: 2 }}
        image='/images/no-posts-avatar.jpg' // Placeholder or user avatar
        alt='No Posts'
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='div' color='text.secondary'>
          There are no posts
        </Typography>
        {/* <Typography variant='body2' color='text.secondary' sx={{ marginTop: 1 }}>
          Start by sharing something with the community. Your posts will appear here.
        </Typography> */}
        <Box sx={{ marginTop: 2 }}>
          <Link href='/'>
            <Button
              variant='contained'
              color='primary'
              startIcon={<AddIcon />}
              sx={{ marginTop: 2 }}
              onClick={() => console.log('Navigate to create post page')}
            >
              Go back to home page
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NoPostsCard
