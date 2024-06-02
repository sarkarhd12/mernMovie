

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../api/api';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/api';

const Search = ({ user }) => {
    const navigate = useNavigate();
    const [movieName, setMovieName] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [inPlaylist, setInPlaylist] = useState(false);

    const handleInputChange = (event) => {
        setMovieName(event.target.value);
    };
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (user) {
            axios
                .get(`${BASE_URL}/movies/playlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setPlaylist(response.data);
                    if (movieData) {
                        const movieExists = response.data.some(movie => movie.imdbID === movieData.imdbID);
                        setInPlaylist(movieExists);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error fetching playlist');
                });
        }
    }, [user, movieData]);


    // const handleSearchClick = () => {
    //     if (movieName.length <= 0) {
    //         alert('Please enter a movie name');
    //     } else {
    //         axios
    //             .get(`http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`)
    //             .then((response) => {
    //                 if (response.data.Response === 'True') {
    //                     setMovieData(response.data);
    //                 } else {
    //                     alert(response.data.Error);
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 alert('Error occurred');
    //             });
    //     }
    // };

    const handleSearchClick = async () => {
        if (movieName.length <= 0) {
            alert('Please enter a movie name');
            return;
        }
    
        try {
            const response = await axios.get(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
    
            if (response.data.Response === 'True') {
                setMovieData(response.data);
            } else {
                alert(response.data.Error);
            }
        } catch (error) {
            console.error(error);
            alert('Error occurred');
        }
    };
    
  
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleAddToPlaylist = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You need to be logged in to add to playlist');
            return;
        }

        const movie = {
            imdbID: movieData.imdbID,
            title: movieData.Title,
            year: movieData.Year,
            poster: movieData.Poster,
            runtime: movieData.Runtime,
            description: movieData.Plot,
            genre: movieData.Genre,
            cast: movieData.Actors,
            addedBy: user._id,
        };

        axios.post(`${BASE_URL}/movies/playlist`, movie, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            alert('Movie added to playlist');
        })
        .catch((error) => {
            console.log(error);
            alert('Failed to add movie to playlist');
        });
    };

    if (!user) {
        navigate("/login");
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Movie Search
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            variant="outlined"
                            placeholder="Enter movie name..."
                            value={movieName}
                            onChange={handleInputChange}
                            size="small"
                        />
                        
                        <Button variant="contained" color="primary" onClick={handleSearchClick}>
                            Search
                        </Button>
                        <Button component={Link} to="/" variant="contained" color="primary">
                            Home
                        </Button>
                        <Button component={Link} to="/playlist" variant="contained" color="primary">
                            Playlist
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                       
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                {movieData && (
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={movieData.Poster}
                                    alt={movieData.Title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <CardContent>
                                    <Typography variant="h4">{movieData.Title}</Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        IMDb Rating: {movieData.imdbRating}
                                    </Typography>
                                    <Box sx={{ my: 2 }}>
                                        <Typography variant="body1">{movieData.Plot}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Rated: {movieData.Rated} | Year: {movieData.Year} | Runtime: {movieData.Runtime}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Genre: {movieData.Genre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cast: {movieData.Actors}
                                    </Typography>
 
                                    
                                       {inPlaylist ? (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                            disabled
                                        >
                                            Already Added
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                            onClick={handleAddToPlaylist}
                                        >
                                            Add to Playlist
                                        </Button> )}
                                   
                                    
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                )}
            </Container>
        </>
    );
};

export default Search;

