import User from '#models/user'
import { createContext, FC, ReactNode, useContext } from 'react'

const AuthContext = createContext<User | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}

export const AuthContextProvider: FC<{ children: ReactNode; user: User }> = ({
  children,
  user,
}) => <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
