import { Typography, Grid, Paper } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    handleShowRegisterForm,
    username,
    password,
}) => {
    return (
        <Paper
            sx={{
                padding: 5,
                boxShadow: 3,
                width: '225px',
                marginLeft: '2rem'
            }}
        >
            <Typography
                variant="h5"
                fontFamily="Roboto"
                mb={2}
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="user-field"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={handleUsernameChange}
                            sx={{ borderWidth: '2px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password-field"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            login
                        </Button>
                        <Button
                            variant="text"
                            onClick={handleShowRegisterForm}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default LoginForm
