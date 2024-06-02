

import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
    unique: true,
  },
  
  title: {
    type: String,
    required: true,
  },
  year: String,
  poster: String,
  runtime : String,
  description : String,
  Genre : String,
  Cast : String,

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
