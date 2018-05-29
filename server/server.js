import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import { registerServer } from 'apollo-server-express';

import graphqlServer from './graphqlServer/graphqlServer';

mongoose.connect('mongodb://localhost/loginApp')
  .then(() => console.log('Database connected'))
  .catch(err => console.log('There was an error connecting to Database', err));

mongoose.connection.on('error', err => console.log('There was an error with the database', err));

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'sgwieuhfui0324r'
}));

registerServer({
  app,
  server: graphqlServer
});

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
