import { Typography, Grid, Paper } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const CreateUserForm = ({
    handleSubmit,
    handleUsernameChange,
    handleNameChange,
    handlePasswordChange,
    username,
    fullName,
    password
}) => {
    return (
        <Paper
            sx={{
                padding: 5,
                boxShadow: 3,
                width: '300px',
                marginLeft: '2rem'
            }}
        >
            <Typography
                variant="h5"
                fontFamily="Roboto"
                mb={2}
                sx={{
                    fontWeight: 'bold'
                }}
            >
        Create an account
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
                            id="name-field"
                            label="Full Name"
                            variant="outlined"
                            value={fullName}
                            onChange={handleNameChange}
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
                            sx={{ borderWidth: '2px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">
              Create account
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default CreateUserForm
