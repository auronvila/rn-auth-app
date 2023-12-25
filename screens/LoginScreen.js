import AuthContent from '../components/Auth/AuthContent';
import {createUser, login} from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {useContext, useState} from 'react';
import {AuthContext} from '../store/auth-context';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const {authenticate, updateRefreshToken} = useContext(AuthContext)

  async function logInHandler({email, password}) {
    setIsLoading(true)
    try {
      const data = await login(email, password)
      authenticate(data.idToken)
      updateRefreshToken(data.refreshToken)
    } catch (e) {
      console.log(e)
      alert('wrong credidentials')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingOverlay message={'Loggin in...'}/>
  } else {
    return <AuthContent isLogin onAuthenticate={logInHandler}/>;
  }
}

export default LoginScreen;
