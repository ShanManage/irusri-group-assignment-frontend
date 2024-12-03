import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, ThemeConfig } from 'antd'
import './styles/variables.scss'
import './styles/ant-overrides.css'
import './styles/main.scss'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'

const config: ThemeConfig = {}

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CartProvider>
      <ConfigProvider theme={config}>
        <App />
      </ConfigProvider>
    </CartProvider>
  </AuthProvider>,
)
