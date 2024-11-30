import { Outlet } from 'react-router-dom'
import { EcHeader } from '../composite'

const AppLayout = () => {
  return (
    <div>
        <EcHeader />
      <div style={{ paddingTop: '8vh' }}>
      <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
