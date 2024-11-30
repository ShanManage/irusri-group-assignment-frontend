import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, ThemeConfig } from 'antd'
import './styles/variables.scss'
import './styles/ant-overrides.css'
import './styles/main.scss'
import { AuthProvider } from './context/AuthContext.tsx'

const config: ThemeConfig = {}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ConfigProvider theme={config}>
        <App />
      </ConfigProvider>
    </AuthProvider>
  </StrictMode>,
)
