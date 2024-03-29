const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smartbrain'
  }
});
const app = express();

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {res.send(database.users) })
app.post('/register', (req, res) => {register.handleRegister(req, res) })
app.post('/Signin', signin.handleSignin(db, bcrypt) )
app.get('/profile/:id',  (req, res) => {profile.handleProfile (req, res, db) })
app.put('/image', (req, res) => {image.handleImage (req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, ()=>{
	console.log('Running on port 3001');
})