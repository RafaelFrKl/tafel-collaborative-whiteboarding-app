import { useState } from 'react'
import Container from "./components/container/Container";
import Notification from './components/Notification';
import LoginForm from './components/LoginForm'
import CreateUserForm from './components/CreateUserForm'
import loginService from './services/login'
import createUserService from './services/createUser'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newName, setNewName] = useState('')
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
      setErrorMessage('Error logging in: ' + exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()
    try {
      const role = null
      const user = await createUserService.createUser({
        newUsername, newName, role, newPassword
      })
      loginService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error creating user: ' + exception)
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
        <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <CreateUserForm
            username={newUsername}
            fullName={newName}
            password={newPassword}

            handleUsernameChange={({ target }) => setNewUsername(target.value)}
            handleNameChange={({ target }) => setNewName(target.value)}
            handlePasswordChange={({ target }) => setNewPassword(target.value)}
            handleSubmit={handleCreateUser}
          />
        </div>
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
