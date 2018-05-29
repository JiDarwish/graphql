import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from '../../models/User';

export default {
  Query: {
    amILoggedIn: (parent, { token }, context) => {
      try {
        const user = jwt.verify(token, 'SuperSecret'); // will throw an error if not valid signature
        console.log(user);
        return { ...user, success: false };
      } catch (err) {
        console.log(err);
        return { username: 'bla', _id: 'basd', success: false };
      }
    }
  },
  Mutation: {
    signUp: (parent, { username, password }, context) => {
      return User.findUserByUsername(username)
        .then(existingUser => {
          if (existingUser) {
            throw Error('user alreadt exists'); // Graphql will deliver it!
          }
          return User.createUser(username, password)
        })
        .then(User.genToken)
        .then(token => {
          return { success: true, token: token };
        })
        .catch(err => {
          console.log(err);
          return { success: false, error: err };
        });
    },
    logIn: (parent, { username, password }, context) => {
      return User.findUserByUsername(username)
        .then(existingUser => {
          if (!existingUser) {
            throw Error('No such user');
          }
          return existingUser.authPass(password).then(isAuth => {
            if (!isAuth) {
              throw Error('Password is not correct');
            }
            return existingUser.genToken();
          })
        })
        .then(token => {
          return { success: true, token };
        })
        .catch(err => {
          return { success: false, error: err };
        });
    }
  }
};

