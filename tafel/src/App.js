import { useState } from 'react'
import Container from './components/container/Container'
import Notification from './components/notification/Notification'
import LoginForm from './components/login/LoginForm'
import createUserService from './services/createUser.js'
import loginService from './services/login'
import Typography from '@mui/material/Typography'
import CreateUserForm from './components/register/CreateUserForm'

function App() {
    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')
    const [showRegisterForm, setShowRegisterForm] = useState(false)

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

    const addUser = async (event) => {
        event.preventDefault()
        try {
            const newRole = 'Student'
            console.log(newUsername, newName, newRole, newPassword)
            await createUserService.createUser({
                username: newUsername,
                name: newName,
                role: newRole,
                password: newPassword
            })
            setNewUsername('')
            setNewName('')
            setNewPassword('')
            setShowRegisterForm(false)
        }catch (exception) {
            setErrorMessage('Error creating user: ' + exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    // eslint-disable-next-line no-unused-vars
    const handleLogout = async (event) => {
    // Deletes logged in User from local storage
        window.localStorage.removeItem('loggedNoteappUser')
        // reload page
        window.location.reload()
    }

    const handleShowRegisterForm = () => {
        setShowRegisterForm(true)
    }

    return (
        <>
            <Typography
                variant="h4"
                fontFamily="Roboto"
                sx={{
                    margin: '2rem',
                    fontWeight: 'bold',
                }}>
        Tafel Collaborative Whiteboard app
            </Typography>

            <Notification message={errorMessage} />

            {!user && !showRegisterForm &&
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            handleShowRegisterForm={handleShowRegisterForm}
        />}
            {!user && showRegisterForm &&
        <CreateUserForm
            username={newUsername}
            fullName={newName}
            password={newPassword}

            handleUsernameChange={({ target }) => setNewUsername(target.value)}
            handleNameChange={({ target }) => setNewName(target.value)}
            handlePasswordChange={({ target }) => setNewPassword(target.value)}
            handleSubmit={addUser}
        />
            }
            {user &&
        <div>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Container></Container>
        </div>
            }

        </>
    )
}

export default App
