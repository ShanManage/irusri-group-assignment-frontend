import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, ThemeConfig } from 'antd'
import './styles/variables.scss'
import './styles/ant-overrides.css'

const config: ThemeConfig = {}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={config}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
