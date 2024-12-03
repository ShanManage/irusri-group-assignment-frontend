import { Flex, Card, Typography } from 'antd'
import { APP_ROUTES } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import { Register } from '../../../components/auth'
import { RegisterFormFields } from '../../../interface'
import { useAuth } from '../../../context/AuthContext'
import { useNotify } from '../../../hooks'

const { Text, Link } = Typography

const RegisterScreen = () => {
  const { signUp } = useAuth()
  const { notify, contextHolder } = useNotify();
  const navigate = useNavigate()

  const onNavigateToLogin = () => navigate(APP_ROUTES.LOGIN)

  const onFinish = async (values: RegisterFormFields) => {
    try {
      const res = await signUp(values)
      if (res.success) {
        setTimeout(() => {
          onNavigateToLogin()
        }, 1000);
        notify(res.message, "", "success");
      }
    } catch (error) {
      notify(
        "Signup failed",
        (error as { message: string }).message || "An unexpected error occurred.",
        "error"
      );
    }
  }
  return (
    <>
      {contextHolder}
      <Flex justify="center" align="center">
        <Card styles={{ body: { padding: '60px 60px', width: '400px' } }}>
          <Register onFinish={onFinish} />
          <Flex justify="center">
            <Text>
              Do you have an account?{' '}
              <Link onClick={onNavigateToLogin}>
                Sign in
              </Link>
            </Text>
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default RegisterScreen
