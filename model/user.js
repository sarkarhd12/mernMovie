import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  playlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
});

const User = mongoose.model('User', userSchema);

export default User;
