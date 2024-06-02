

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, Box, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/api';

const PlayList = () => {
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get(`${BASE_URL}/movies/playlist`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPlaylist(response.data);
            })
            .catch((error) => {
                console.error(error);
                alert('Error fetching playlist');
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleRemove = (imdbID) => {
        const token = localStorage.getItem('token');
        axios
            .delete(`${BASE_URL}/movies/playlist/${imdbID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPlaylist(playlist.filter(movie => movie.imdbID !== imdbID));
            })
            .catch((error) => {
                console.error(error);
                alert('Error removing movie from playlist');
            });
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Playlist
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleHome}>
                            Home
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    {playlist.map((movie, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={movie.poster}
                                    alt={movie.title}
                                />
                                <CardContent>
                                    <Typography variant="h6">{movie.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Year:</strong> {movie.year}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Runtime:</strong> {movie.runtime}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Description:</strong> {movie.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Genre:</strong> {movie.Genre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Cast:</strong> {movie.Cast}
                                    </Typography>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        sx={{ mt: 1 }}
                                        onClick={() => handleRemove(movie.imdbID)}
                                    >
                                        Remove from Playlist
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default PlayList;
