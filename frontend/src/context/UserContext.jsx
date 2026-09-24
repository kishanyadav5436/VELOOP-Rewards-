import { createContext, useContext, useState } from 'react'
import { mockSession } from '../data/mockSession'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [session, setSession] = useState(mockSession)

  function login(userData) {
    setSession({ isLoggedIn: true, user: userData })
  }

  function logout() {
    setSession({ isLoggedIn: false, user: null })
  }

  function updateBalance(currency, newAmount) {
    setSession(prev => ({
      ...prev,
      user: {
        ...prev.user,
        balances: { ...prev.user.balances, [currency]: newAmount },
      },
    }))
  }

  function deductBalance(currency, amount) {
    setSession(prev => {
      const current = prev.user?.balances?.[currency] ?? 0
      return {
        ...prev,
        user: {
          ...prev.user,
          balances: { ...prev.user.balances, [currency]: current - amount },
        },
      }
    })
  }

  return (
    <UserContext.Provider value={{
      isLoggedIn:    session.isLoggedIn,
      user:          session.user,
      balances:      session.user?.balances ?? { VEs: 0, SVEs: 0, Tokens: 0 },
      currentUserId: session.user?.userId ?? null,
      login,
      logout,
      updateBalance,
      deductBalance,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>')
  return ctx
}
