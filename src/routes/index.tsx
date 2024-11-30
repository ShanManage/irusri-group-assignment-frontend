// Routes
// This folder contains the routing configuration and components that manage the application's navigation structure. 

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { APP_ROUTES } from '../constant'
import { LoginScreen } from '../pages'
import RegisterScreen from '../pages/auth/registerScreen/RegisterScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={APP_ROUTES.ROOT} element={<LoginScreen />} />
      <Route path={APP_ROUTES.LOGIN} element={<LoginScreen />} />
      <Route path={APP_ROUTES.REGISTER} element={<RegisterScreen />} />
      {/* <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} /> */}
    </Route>
  )
)

const AppRoutes = () => {
  return <RouterProvider router={router} />
}
export default AppRoutes
