import { UserInfo } from '@/components/user-info'
import { currenUser } from '@/lib/auth'


const ServerPage = async () => {
    const user = await currenUser()
  return (
    <UserInfo user={user} lable='💻Серверный компонет' />
  )
}
export default ServerPage