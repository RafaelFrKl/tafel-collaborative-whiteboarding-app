import { Typography, Grid, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <Paper 
        sx={{ 
            p: 4, 
            boxShadow: 3, 
            width: '350px',
            marginLeft: '2rem'
        }}
    >
      <Typography 
        variant="h5" 
        fontFamily="Roboto" 
        mb={2}
        sx={{ 
          fontWeight: 'bold',
        }}>
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
              sx={{ borderWidth: '2px'}}
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
        </Grid>
        <Button 
            type="submit" 
            variant="contained"
            sx={{mt: 2}}
        >login</Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
