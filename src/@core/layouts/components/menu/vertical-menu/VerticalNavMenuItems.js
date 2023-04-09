// ** React Imports
import { useContext } from 'react'

// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'
import {getUserData} from '@Utils'
// ** Ability Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem
} from '@Layouts/utils'

const VerticalMenuNavItems = props => {
  // ** Context
  const ability = useContext(AbilityContext)

  // ** Components Object
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink
  }

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    // console.log(item, 24234)
    const TagName = Components[resolveNavItemComponent(item)]
    console.log(item?.roles);
console.log(getUserData()?.information?.role);
    if (item?.roles?.includes(getUserData()?.information?.role+"")) {
      if (item.children) {
        return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
      }
  
      return canViewMenuItem(item) && <TagName key={item.id || item.header} item={item} {...props} />  
    }
    
  })

  return RenderNavItems
}

export default VerticalMenuNavItems
