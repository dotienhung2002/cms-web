import AvatarGroup from '@Components/avatar-group'

const data = [
  {
    img: require('@Assets/images/portrait/small/avatar-s-5.jpg').default
  },
  {
    img: require('@Assets/images/portrait/small/avatar-s-7.jpg').default
  },
  {
    img: require('@Assets/images/portrait/small/avatar-s-10.jpg').default
  },
  {
    img: require('@Assets/images/portrait/small/avatar-s-11.jpg').default
  },
  {
    img: require('@Assets/images/portrait/small/avatar-s-20.jpg').default
  }
]

const AvatarGroupComponent = () => {
  return <AvatarGroup data={data} />
}

export default AvatarGroupComponent
