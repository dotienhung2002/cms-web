import Avatar from '@Components/avatar'
import avatarImg from '@Assets/images/portrait/small/avatar-s-20.jpg'

const AvatarSizes = () => {
  return (
    <div className='demo-inline-spacing'>
      <Avatar img={avatarImg} size='sm' />
      <Avatar img={avatarImg} />
      <Avatar img={avatarImg} size='lg' />
      <Avatar img={avatarImg} size='xl' />
    </div>
  )
}
export default AvatarSizes
