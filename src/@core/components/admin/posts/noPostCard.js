import React from 'react'
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

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
        marginTop: 4
      }}
    >
      <CardMedia
        component='img'
        sx={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', marginBottom: 2 }}
        image='/images/no-posts.jpg' // You can use a placeholder image or an icon
        alt='No Posts'
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='div' color='text.secondary'>
          No posts available
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ marginTop: 1 }}>
          It seems there are no posts at the moment. You can create new posts to get started.
        </Typography>
        {/* Optionally, you can add a button or link to create a new post */}
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          sx={{ marginTop: 2 }}
          onClick={() => console.log('Navigate to create post page')}
        >
          Create Post
        </Button>
      </CardContent>
    </Card>
  )
}

export default NoPostsCard
