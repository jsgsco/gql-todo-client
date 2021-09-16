import { useState, useEffect, useMemo } from 'react'
import client from './config/apollo'
import { ApolloProvider } from '@apollo/client'
import Auth from './pages/Auth'
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import { getToken, removeToken, decodeToken } from './utils/token'
import AuthContext from './context/AuthContext'


function App() {

  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    const token = getToken()
    if(!token) {
      setAuth(null)
    } else {
      setAuth(decodeToken(token))
    }
  }, [])

  const logout = () => {
    removeToken()
    setAuth(null)
    window.location.reload()
  }

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  )

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Home /> }
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
