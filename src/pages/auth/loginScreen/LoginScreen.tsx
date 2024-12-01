import { Flex, Card, Typography } from 'antd'
import { Login } from '../../../components/auth'
import { APP_ROUTES } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import { useNotify } from '../../../hooks'
import { useAuth } from '../../../context/AuthContext'
import { LoginFormFields } from '../../../interface'

const { Text, Link } = Typography

const LoginScreen = () => {
  const { authenticate } = useAuth()
  const { notify, contextHolder } = useNotify();
  const navigate = useNavigate()

  const onNavigateToRegister = () => navigate(APP_ROUTES.REGISTER)

  const onNavigateToHome = () => navigate(APP_ROUTES.ROOT)

  const onFinish = async (values: LoginFormFields) => {
    try {
      const res = await authenticate(values)
      if (res.success) {
        onNavigateToHome()
        
        notify(res.message, "", "success");
      }
    } catch (error) {
      notify(
        "Signin failed",
        (error as { message: string }).message || "An unexpected error occurred.",
        "error"
      );
    }
  }
  return (
    <>
      {contextHolder}
    <Flex justify="center" align='center'>
      <Card styles={{ body: { padding: '60px 60px', width: '400px' } }}>
        <Login onFinish={onFinish} />
        <Flex justify="center">
          <Text>
            Don't you have an account?{' '}
            <Link onClick={onNavigateToRegister}>
              Sign up
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
    </>
  )
}

export default LoginScreen
