import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  // {
  //   path: '/dashboard/analytics',
  //   component: lazy(() => import('../../views/dashboard/analytics')),
  //   roles:['admin']

  // },
  {
    path: '/dashboard/statistical',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true,
    roles:['admin']

  }
]

export default DashboardRoutes
