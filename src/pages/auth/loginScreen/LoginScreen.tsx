import { Flex, Card } from 'antd'
import { Login } from '../../../components/auth'

const LoginScreen = () => {
  return (
    <Flex justify="center" align='center'>
      <Card styles={{ body: { padding: '30px 60px', width: '400px' } }}>
        <Login />
      </Card>
    </Flex>
  )
}

export default LoginScreen
