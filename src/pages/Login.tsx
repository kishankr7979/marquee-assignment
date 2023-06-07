import React, { useContext, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { eligibleUsersToSignIn, signJWTToken } from '../utils';
import { useNavigate } from 'react-router-dom';
import routerPaths from '../navigation';
import AuthContext from '../context/auth/AuthContext';
import { UPDATE_USER_AUTH_DATA } from '../context/auth/action';

const LoginPage: React.FC = () => {
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    userId: string,
    password: string,
  }>({ userId: '',
  password: ''});
  const [error, setError] = useState<boolean>(false);

  const handleLogin = async () => {
    // Handle login logic here
    const validUser = eligibleUsersToSignIn.find((item) => JSON.stringify(item) === JSON.stringify(userData))
    console.log(validUser, !!validUser);
    if(!validUser) {
        setError(true);
        return;
    }
    const token = await signJWTToken(userData['userId']);
    localStorage.setItem('todo-app-auth', token);
    dispatch({type: UPDATE_USER_AUTH_DATA, payload: {
        ...userData,
        jwtToken: token
    }})
    navigate(routerPaths.Dashboard);
  };

  const isDisabled = userData['userId'].length <= 3 || userData['password'].length <= 6;

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData['userId']}
          onChange={(e) => setUserData({...userData, userId: e.target.value})}
          error={error}
          {...(error && {helperText: "Invalid credentials"})}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={userData['password']}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          error={error}
          {...(error && {helperText: "Invalid credentials"})}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={isDisabled}
        >
          Login
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
