import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserCard({ user }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex items-center">
      <img
        className="w-10 h-10 rounded-full object-cover mr-4"
        src={user.picture}
        alt={user.name}
      />
      <span>{user.name}</span>
    </div>
  )
}

function App() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10')
      const userData = response.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        picture: user.picture.medium,
      }))
      setUsers(userData)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedUsers = filteredUsers.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Список пользователей</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск пользователя"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={fetchUsers}
      >
        Обновить
      </button>
      {sortedUsers.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
    </div>
  )
}

export default App
