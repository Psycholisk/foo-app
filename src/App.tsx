import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

const PAGE_SIZE = 20
interface UserInterface {
  id: string
  gender?: 'male' | 'female' | 'non-binary'
  name?: {
    title?: string
    first?: string
    last?: string
  }
  email?: string
  phone?: string
}

const UserInfo = ({ user }: { user: UserInterface }): JSX.Element => {
  return (
    <li className='card user'>
      <h2 className='user__name'>{`${user?.name?.title} ${user?.name?.first} ${user?.name?.last}`}</h2>
      <p className='user__detail'>
        <strong>Gender</strong>: {user?.gender}
      </p>
      <p className='user__detail'>
        <strong>Email:</strong> {user?.email}
      </p>
      <p className='user__detail'>
        <strong>Phone number:</strong> {user?.phone}
      </p>
    </li>
  )
}

const App = () => {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchUsers = async () => {
    try {
      setIsFetching(true)
      const response = await fetch('https://randomuser.me/api?results=20')
      setIsFetching(false)
      const { results } = await response.json()
      setUsers([...users, ...results.map((user: UserInterface) => ({ ...user, id: uuidv4() }))])
    } catch (error) {
      console.log('Could not fetch users', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <ul className='users-list'>
      {users.map((user: UserInterface) => (
        <UserInfo user={user} key={`user-${user.id}`} />
      ))}
      <li
        className={`card users-list__load-more ${isFetching ? 'users-list__load-more--loading' : ''}`}
        onClick={fetchUsers}>
        <div className='users-list__load-more__label'>Load more</div>
        <div className='users-list__load-more__spinner'></div>
      </li>
    </ul>
  )
}

export default App
