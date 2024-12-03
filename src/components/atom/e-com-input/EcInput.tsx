import { Input, InputProps } from 'antd';

const EcInput = ({ ...rest }: InputProps) => {
  if (rest.type === 'password') {
    return <Input.Password {...rest} />;
  }
  return <Input {...rest} />;
};

export default EcInput