import { Flex, Card, Typography } from 'antd'
import { APP_ROUTES } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import { Register } from '../../../components/auth'

const { Text, Link } = Typography

const RegisterScreen = () => {
  const navigate = useNavigate()

  const onNavigate = () => {
    navigate(APP_ROUTES.LOGIN)
  }
  return (
    <Flex justify="center" align='center'>
      <Card styles={{ body: { padding: '60px 60px', width: '400px' } }}>
        <Register />
        <Flex justify="center">
          <Text>
            Do you have an account?{' '}
            <Link onClick={onNavigate}>
              Sign in
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  )
}

export default RegisterScreen
