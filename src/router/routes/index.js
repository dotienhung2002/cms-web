// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import {getUserData} from '@Utils'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
let DefaultRoute = '/cms/product/list'

if (getUserData()?.information?.role+""=="1") {
 DefaultRoute = '/dashboard/statistical'
}
// ** Merge Routes
const ListRoutes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  // ...UiElementRoutes,
  // ...ExtensionsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartMapsRoutes
]

export { DefaultRoute, TemplateTitle, ListRoutes }
