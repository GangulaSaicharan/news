import BlankLayout from 'src/@core/layouts/BlankLayout'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import UserLayout from 'src/layouts/UserLayout'

const Test = () => {
  return <p className='text-red'>Test Page</p>
}

Test.guestGuard = false
Test.authGuard = false
export default Test
