import { Button, ButtonProps } from 'antd'
import { ButtonType } from 'antd/es/button';

export interface EcButtonProps extends Omit<ButtonProps, 'type'> {
  type: ButtonType | 'secondary'
}

const EcButton = ({children, type, ...rest}: EcButtonProps) => {
  return <Button {...rest} type={type !== 'secondary' ? type : 'default'}>{children}</Button>
}

export default EcButton;