import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

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
    <li>
      <h2>{`${user?.name?.title} ${user?.name?.first} ${user?.name?.last}`}</h2>
      <p>
        <strong>Gender</strong>: {user?.gender}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Phone number:</strong> {user?.phone}
      </p>
      <br />
    </li>
  )
}

const App = () => {
  const [users, setUsers] = useState<UserInterface[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api?results=20')
        const { results } = await response.json()
        setUsers(results.map((user: UserInterface) => ({ ...user, id: uuidv4() })))
      } catch (error) {
        console.log('Could not fetch users', error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <ul>
      {users.map((user: UserInterface) => (
        <UserInfo user={user} key={`user-${user.id}`} />
      ))}
    </ul>
  )
}

export default App
