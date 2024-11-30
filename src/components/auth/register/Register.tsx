import {
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd"
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { RegisterFormFields } from "../../../interface";
import { EcButton } from "../../atom";

const { Text, Title } = Typography

const Register = () => {
  return (
    <>
      <Flex justify="center">
        <Title className='zero-margin' type='warning'>ECOM-SHOP</Title>
      </Flex>
      <Flex justify="center"><Text disabled>Sign up to your account</Text></Flex><br /><br />

      <Form onFinish={() => {}}>
        <Space direction="vertical" className="full-width">
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
