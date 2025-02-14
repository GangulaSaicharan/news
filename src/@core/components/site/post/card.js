import React from 'react'
import { Grid, Typography, Card, CardContent, CardMedia } from '@mui/material'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NewsCard = ({ title, imageUrl, postId }) => {
  const router = useRouter()

  const handleNavigate = () => {
    // Navigate to the post detail page
    router.push(`/news/${postId}`)
  }

  return (
    <Card sx={{ display: 'flex', marginBottom: 2, boxShadow: 3, cursor: 'pointer' }} onClick={handleNavigate}>
      {/* Left side: Image */}
      <CardMedia component='img' sx={{ width: 120, height: 120, objectFit: 'cover' }} image={imageUrl} alt={title} />

      {/* Right side: Title */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant='h6' component='div' noWrap>
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default NewsCard
