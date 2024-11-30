import {
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd"
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Login.module.scss';
import { LoginFormFields } from "../../../interface";
import { EcButton } from "../../atom";

const { Text, Title, Link } = Typography

const Login = () => {
  return (
    <>
      <Flex justify="center">
        <Title className='zero-margin' type='warning'>ECOM-SHOP</Title>
      </Flex>
      <Flex justify="center"><Text disabled>Login to your account</Text></Flex><br /><br />

      {/* {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )} */}

      <Form onFinish={() => {}}>
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
              prefix={<MailOutlined className={styles.prefix} />}
              placeholder='Email Address'
            />
          </Form.Item>
          <Form.Item<LoginFormFields>
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className={styles.prefix} />}
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
              Login
            </EcButton>
          </Form.Item>

          <Form.Item>
            <Flex justify="center">
              <Text>
                Don't you have an account?{' '}
                <Link href="/signup">
                  Sign up
                </Link>
              </Text>
            </Flex>
          </Form.Item>
        </Space>
      </Form>
    </>
  )
}

export default Login
