import express from "express";
import axios from "axios";
import Movie from "../model/movies.js";
import User from "../model/user.js";

import { authMiddleware } from "../utils/auth.js";

const movieRouter = express.Router();

// movieRouter.post('/playlist',authMiddleware, async (req, res) => {
//   const { imdbID, title, year, poster, runtime, description, genre, cast, addedBy } = req.body;
  

//   try {
//       // Check if the movie already exists
//       const existingMovie = await Movie.findOne({ imdbID });

//       if (existingMovie) {
//           return res.status(400).json({ error: 'Movie already added to playlist' });
//       }

//       // If movie does not exist, create and save it
//       const movie = new Movie({
//           imdbID,
//           title,
//           year,
//           poster,
//           runtime,
//           description,
//           Genre: genre,
//           Cast: cast,
//           addedBy,
//       });

//       await movie.save();
//       const user = await User.findById(req.user._id);
//       user.playlist.push(movie._id);
//       await user.save();
//       res.status(201).json(movie);
//   } catch (error) {
//       console.error('Failed to save movie:', error);
//       res.status(500).json({ error: 'Failed to save movie' });
//   }
// });

movieRouter.post('/playlist', authMiddleware, async (req, res) => {
  const { imdbID, title, year, poster, runtime, description, genre, cast } = req.body;
  const addedBy = req.user._id; // Assuming authMiddleware sets req.user._id

  try {
      // Check if the movie already exists
      const existingMovie = await Movie.findOne({ imdbID });

      if (existingMovie) {
          return res.status(400).json({ error: 'Movie already added to playlist' });
      }

      // Create a new movie instance
      const movie = new Movie({
          imdbID,
          title,
          year,
          poster,
          runtime,
          description,
          Genre: genre,
          Cast: cast,
          addedBy,
      });

      await movie.save();

      // Find the user and add the movie to the playlist
      const user = await User.findById(addedBy);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      user.playlist.push(movie._id);
      await user.save();

      res.status(201).json(movie);
  } catch (error) {
      console.error('Failed to save movie:', error);
      res.status(500).json({ error: 'Failed to save movie' });
  }
});


movieRouter.get('/playlist', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(req.body)

    const user = await User.findById(userId).populate('playlist');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user.playlist);
  } catch (error) {
    console.error('Error fetching playlist:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// movieRouter.delete('/playlist/:imdbID', authMiddleware, async (req, res) => {
//   const { imdbID } = req.params;
//   const userId = req.user._id;

//   try {
//       const user = await User.findById(userId);
//       console.log(user)

//         console.log(user.playlist)

//       if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//       }

//       const movie = await Movie.findOne({ imdbID });
//       // console.log(movie._id.toString())

//       if (!movie) {
//         return res.status(404).json({ error: 'Movie not found' });
//     }

//     user.playlist = user.playlist.filter(movieId =>{
//        console.log(movieId.toString())
//       // console.log(movie.fullname)
//       movieId => movieId.toString() !== imdbID});

//       await user.save();

//       res.status(200).json({ message: 'Movie removed from playlist' });
//   } catch (error) {
//       console.error('Error removing movie from playlist:', error.message);
//       res.status(500).json({ error: 'Server error' });
//   }
// });

movieRouter.delete('/playlist/:imdbID', authMiddleware, async (req, res) => {
  const { imdbID } = req.params;
  const userId = req.user._id;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const movie = await Movie.findOne({ imdbID });
      if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
      }

      // Remove the movie from the user's playlist
      user.playlist = user.playlist.filter(movie => movie.imdbID !== imdbID);
      await user.save();

      // Remove the movie from the Movie collection if it's no longer needed
      if (user.playlist.every(movie => movie.imdbID !== imdbID)) {
          await Movie.findOneAndDelete({ imdbID });
      }

      res.status(200).json({ message: 'Movie removed from playlist' });
  } catch (error) {
      console.error('Error removing movie from playlist:', error.message);
      res.status(500).json({ error: 'Server error' });
  }
});




export default movieRouter;