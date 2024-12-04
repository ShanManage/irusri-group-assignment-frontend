import {
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd"
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { RegisterFormFields, RegisterProps } from "../../../interface";
import { EcButton } from "../../atom";
import { APP_ROUTES } from "../../../constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const { Text, Title } = Typography

const Register = ({ onFinish }: RegisterProps) => {
  const navigate = useNavigate()
  const { isLoading } = useAuth()

  const onNavigateToHome = () => {
    navigate(APP_ROUTES.ROOT)
  }
  return (
    <>
      <Flex justify="center">
        <Title className='zero-margin cursor-pointer' type='warning' onClick={onNavigateToHome}>ECOM-SHOP</Title>
      </Flex>
      <Flex justify="center"><Text disabled>Sign up to your account</Text></Flex><br /><br />

      <Form onFinish={onFinish}>
        <Space direction="vertical" className="full-width">
          <Form.Item<RegisterFormFields>
            name="name"
            rules={[
              { required: true, message: 'Please enter your name!' },
            ]}
          >
            <Input
              size='large'
              prefix={<UserOutlined />}
              placeholder='Your Name'
            />
          </Form.Item>
          <Form.Item<RegisterFormFields>
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
          <Form.Item<RegisterFormFields>
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
              Sign up
            </EcButton>
          </Form.Item>

        </Space>
      </Form>
    </>
  )
}

export default Register
