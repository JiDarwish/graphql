import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
});

UserSchema.statics.findUserByUsername = function (username) {
  return this.findOne({ username });
}

UserSchema.statics.createUser = function (username, password) {
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashed => {
      return new this({ username, password: hashed }).save();
    });
}

UserSchema.statics.genToken = function (user) {
  return new Promise((resolve, reject) => {
    const { username, _id } = user;
    jwt.sign({ username, _id }, 'SuperSecret', (err, signature) => {
      if (err) {
        reject(err);
      }
      resolve(signature);
    });
  });
}

UserSchema.methods.authPass = function (password) {
  return bcrypt.compare(password, this.password)
}

UserSchema.methods.genToken = function () {
  return new Promise((resolve, reject) => {
    const { username, _id } = this;
    jwt.sign({ username, _id }, 'SuperSecret', (err, signature) => {
      if (err) {
        reject(err);
      }
      resolve(signature);
    });
  });
}

export default mongoose.model('User', UserSchema);