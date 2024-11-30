import { Flex, Card, Typography } from 'antd'
import { Login } from '../../../components/auth'
import { APP_ROUTES } from '../../../constant'
import { useNavigate } from 'react-router-dom'

const { Text, Link } = Typography

const LoginScreen = () => {
  const navigate = useNavigate()

  const onNavigate = () => {
    navigate(APP_ROUTES.REGISTER)
  }
  return (
    <Flex justify="center" align='center'>
      <Card styles={{ body: { padding: '60px 60px', width: '400px' } }}>
        <Login />
        <Flex justify="center">
          <Text>
            Don't you have an account?{' '}
            <Link onClick={onNavigate}>
              Sign up
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  )
}

export default LoginScreen
