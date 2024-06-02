
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/api';

const defaultTheme = createTheme();


const SignUp = () => {

    const navigate = useNavigate();

    const [formData,SetFormData] = useState({
        fullname: '',
        email : '',
        password : ''
    })

    const handleInputChange = (event) =>{
          const {name , value} = event.target;
          SetFormData({
            ...formData,
            [name]: value
          })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/user/signup`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                });
                const result = await response.json();
                if(result.user._id){
                    navigate('/login');
                }
                else{
                    alert('Failed to create account');
                }
        }catch(error){
            console.error(error);
        }

    }

    const handleSignInClick = () =>{
        navigate('/login');
    }

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }} >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            < LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate
                            sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="fullname"
                                        required
                                        fullWidth
                                        id="fullname"
                                        label="Full name"
                                        autoFocus
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="email"
                                        id="email"
                                        label="Email address"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleInputChange}


                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        id="password"
                                        label="password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleInputChange}


                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}>
                                Sign Up
                            </Button>
                            <Grid
                                container
                                justifyContent="flex-end"
                              >
                                <Grid item>
                                    <Button
                                     variant="text" 
                                    onClick={handleSignInClick}
                                    sx={{ 
                                        textTransform: 'none',
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            backgroundColor: 'transparent'
                                        } 
                                    }}>
                                        Already have an account? Sign in
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default SignUp;