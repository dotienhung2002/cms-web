// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import layout from './layout'
import navbar from './navbar'
// import users from '@Views/apps/user/store/reducer'
import ecommerce from '@Views/apps/ecommerce/store/reducer'
// import invoice from '@Views/apps/invoice/store/reducer'
import dataTables from '@Views/tables/data-tables/store/reducer'
const rootReducer = combineReducers({
  auth,
  // users,
  navbar,
  layout,
  // invoice,
  ecommerce,
  dataTables
})

export default rootReducer
