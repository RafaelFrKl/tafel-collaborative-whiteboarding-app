import { useState } from 'react'
import Container from "./components/container/Container";
import Notification from './components/Notification';
import LoginForm from './components/LoginForm'
import loginService from './services/login'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      loginService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    // Deletes logged in User from local storage
    window.localStorage.removeItem('loggedNoteappUser')
    // reload page
    window.location.reload();
  }


  return (
    <>
      <h1>Tafel Collaborative Whiteboard app</h1>

      <Notification message={errorMessage} />

      {!user &&
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      }
      {user &&
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Container></Container>
        </div>
      }
      
    </>
  );
}

export default App;
