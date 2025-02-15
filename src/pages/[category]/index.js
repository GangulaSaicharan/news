// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import navigation from 'src/configs/navigation'

// ** Component
const Category = ({ category }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={`welcome to ${category}`}></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>This is your {category} page.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

// export const getStaticPaths = async () => {
//   // Call the navigation function to get paths dynamically
//   const categories = navigation().map(item => item.path.split('/')[1])
//   const paths = categories.map(category => ({
//     params: { category }
//   }))

//   return { paths, fallback: false }
// }

export const getStaticPaths = async () => {
  const categories = navigation()
    .map(item => item.path.split('/')[1]) // Extract category
    .filter(category => category !== '' && category !== undefined) // ✅ Remove empty values

  const paths = categories.map(category => ({
    params: { category }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const { category } = params

  return {
    props: { category } // Pass category as a prop to the component
  }
}

Category.guestGuard = false
Category.authGuard = false
export default Category
