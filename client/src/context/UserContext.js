import React, { useContext, useState } from "react"

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

// custom hooks for easy access to these values
export function useUser() {
  return useContext(UserContext)
}
export function useUserUpdate() {
  return useContext(UserUpdateContext)
}


export function UserProvider({ children }) {
  const [user, setUser] = useState('john')

  // updates state
  function changeUser() {
    setUser(prevUser => user)
  }

  // persisting values down to children
  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={changeUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}