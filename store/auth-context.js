import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshTokenLogIn} from '../util/auth';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  email: '',
  refreshToken: '',
  updateRefreshToken: (refreshToken) => {
  },
  authenticate: (token) => {
  },
  logOut: () => {
  }
})

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  function updateRefreshToken(refreshToken) {
    AsyncStorage.setItem('refreshToken', refreshToken)
    setRefreshToken(refreshToken)
    refreshTokenLogIn(refreshToken)
  }

  function authenticate(token) {
    AsyncStorage.setItem('token', token)
    setAuthToken(token)
  }

  function logOut() {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('refreshToken')
    setAuthToken(null)
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logOut,
    refreshToken,
    updateRefreshToken,
  }

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider