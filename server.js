const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require('./controllers/profile');
const image = require ('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '0815',
      database : 'smart-brain'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

app.get('/', (req, res) => { res.send('it is working')})

app.post('/signin', signin.handleSignin(db, bcrypt))  // the same like before (arrow function)

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet (req, res, db)})

app.put('/image', (req, res) => { image.handleImage (req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall (req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})