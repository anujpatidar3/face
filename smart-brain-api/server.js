const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./Controllers/register.js');
const signin = require('./Controllers/signin.js');
const profile = require('./Controllers/profile.js');
const image=require('./Controllers/image.js')

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port:'5432',
    user:'postgres',
    password : 'star',
    database : 'postgres'
  },
});
// const connectionString ='postgressql://postgres:star@127.0.0.1:5432/postgres'
// const client=new Client({
//   connectionString:connectionString
// })
// client.connect();

const app = express();

db.select('*').from('users').then(data=>{
  console.log(data); 
});

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send(db.users)})
app.post('/signin', signin.handleSignin(db,bcrypt))
app.post('/register',register.handleRegister(db,bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', (req, res) => image.handleImage(req,res,db))
app.post('/imageurl',(req,res)=>image.handleApiCall(req,res))

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})