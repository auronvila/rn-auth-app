import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth';
import {useContext, useState} from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../store/auth-context';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const {authenticate, updateRefreshToken} = useContext(AuthContext)

  async function signUpHandler({email, password}) {
    try {
      setIsLoading(true)
      const data = await createUser(email, password)
      authenticate(data.idToken)
      updateRefreshToken(data.refreshToken)
    } catch (e) {
      alert('authantication failed please check the inputs and try again')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingOverlay message={'Loading...'}/>
  } else {
    return <AuthContent onAuthenticate={signUpHandler}/>;
  }

}

export default SignupScreen;
