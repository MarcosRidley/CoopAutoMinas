import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

const theme = createTheme();

export default function SignIn(props) {
  const [isWrong, setIsWrong] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const options = {
      method: 'POST',
      body: JSON.stringify({
        user: data.get('user'),
        password: data.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // fetch('http://localhost:5000/userauth', options)
    fetch('https://cooperativadarhaissa.herokuapp.com/userauth', options)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'Authorized') {
          localStorage.setItem('token', res.key);      
          navigate('/');
        } else {
          setIsWrong(true);
          setIsLoading(false);
        }
        
      })
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            MGCOOP
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {isWrong && (<p style={{"fontSize":"1.5em", "color": "red" }}>Usuário ou senha incorretos! </p>)}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuário"
              name="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              { isLoading ? 'Carregando...' : 'Entrar' }
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}