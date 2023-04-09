import AvatarGroup from '@Components/avatar-group'
import react from '@Assets/images/icons/react.svg'
import vuejs from '@Assets/images/icons/vuejs.svg'
import angular from '@Assets/images/icons/angular.svg'
import bootstrap from '@Assets/images/icons/bootstrap.svg'
import avatar1 from '@Assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@Assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@Assets/images/portrait/small/avatar-s-7.jpg'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const avatarGroupData1 = [
  {
    title: 'Galvin',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Malcolm',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Leo',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: 'Nola',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Brett',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Harper',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData3 = [
  {
    title: 'Jamalia',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Arden',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Laith',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData4 = [
  {
    title: 'Kirby',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Forrest',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Jordan',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]
const TableStripedDark = () => {
  return (
    <Table striped dark responsive>
      <thead>
        <tr>
          <th>Project</th>
          <th>Client</th>
          <th>Users</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img className='mr-75' src={angular} alt='angular' height='20' width='20' />
            <span className='align-middle font-weight-bold'>Angular Project</span>
          </td>
          <td>Peter Charles</td>
          <td>
            <AvatarGroup data={avatarGroupData1} />
          </td>
          <td>
            <Badge pill color='light-primary' className='mr-1'>
              Active
            </Badge>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow text-white' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
        <tr>
          <td>
            <img className='mr-75' src={react} alt='react' height='20' width='20' />
            <span className='align-middle font-weight-bold'>React Project</span>
          </td>
          <td>Ronald Frest</td>
          <td>
            <AvatarGroup data={avatarGroupData2} />
          </td>
          <td>
            <Badge pill color='light-success' className='mr-1'>
              Completed
            </Badge>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow text-white' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
        <tr>
          <td>
            <img className='mr-75' src={vuejs} alt='vuejs' height='20' width='20' />
            <span className='align-middle font-weight-bold'>Vuejs Project</span>
          </td>
          <td>Jack Obes</td>
          <td>
            <AvatarGroup data={avatarGroupData3} />
          </td>
          <td>
            <Badge pill color='light-info' className='mr-1'>
              Scheduled
            </Badge>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow text-white' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
        <tr>
          <td>
            <img className='mr-75' src={bootstrap} alt='bootstrap' height='20' width='20' />
            <span className='align-middle font-weight-bold'>Bootstrap Project</span>
          </td>
          <td>Jerry Milton</td>
          <td>
            <AvatarGroup data={avatarGroupData4} />
          </td>
          <td>
            <Badge pill color='light-warning' className='mr-1'>
              Pending
            </Badge>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow text-white' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableStripedDark