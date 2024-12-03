import {
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd"
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginFormFields, LoginProps } from "../../../interface";
import { EcButton } from "../../atom";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constant";
import { useAuth } from "../../../context/AuthContext";

const { Text, Title } = Typography

const Login = ({ onFinish }: LoginProps) => {
  const navigate = useNavigate()
  const { isLoading } = useAuth()

  const onNavigateToHome = () => navigate(APP_ROUTES.ROOT)
  return (
    <>
      <Flex justify="center">
        <Title className='zero-margin cursor-pointer' type='warning' onClick={onNavigateToHome}>ECOM-SHOP</Title>
      </Flex>
      <Flex justify="center"><Text disabled>Sign in to your account</Text></Flex><br /><br />

      <Form onFinish={onFinish}>
        <Space direction="vertical" className="full-width">
          <Form.Item<LoginFormFields>
            name="username"
            rules={[
              { required: true, message: 'Please enter your Email!' },
              { type: 'email', message: 'Please enter valid Email!' },
            ]}
          >
            <Input
              size='large'
              prefix={<MailOutlined />}
              placeholder='Email Address'
            />
          </Form.Item>
          <Form.Item<LoginFormFields>
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined />}
              placeholder='Password'
              data-testid="password-field"
            />
          </Form.Item>

          <Form.Item>
            <EcButton
              type="primary"
              size='large'
              htmlType="submit"
              className='full-width'
              loading={isLoading}
            >
              Sign in
            </EcButton>
          </Form.Item>

        </Space>
      </Form>
    </>
  )
}

export default Login
