const express=require('express');
const bodyParser = require('body-parser')
const bcrypt=require('bcrypt-nodejs')
const cors= require('cors')

const app=express();

const database = {
    users:[
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'cookies',
            entries:0,
            joined: new Date(),
        },
        {
            id:'124',
            name:'Sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined: new Date(),
        }
    ]
}

app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send(database.users)
})

app.post('/signin',(req,res)=>{ 
    if(req.body.email===database.users[0].email &&
        req.body.password===database.users[0].password){
            res.json('success')
    }else{
        res.status(400).json('error')
    }
})

app.post('/register',(req,res)=>{
    const{email,name} = req.body;
      database.users.push({
        id:'125',
        name:name,
        email:email,
        entries:0,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
  const {id}=req.params;
  let found= false;
  database.users.forEach(user=>{
    if(user.id === id){
        found=true;
        return res.json(user);
    }
  })
  if(!found){
      res.status(400).json("Not Found");
  }
})

app.put('/image',(req,res)=>{
   const {id}=req.body;
    let found= false;
    database.users.forEach(user=>{
        if(user.id === id){
            found=true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json("Not Found");
    }
})




app.listen(3000,()=>{
    console.log('app is running')
})

/*
res -> this is working
signIn --> POST = success/fail
register --> POST = user
/profile/:userID -> GET = user
/image --> PUT = user(score)

*/

// bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash)
    // });
    // Load hash from your password DB.
    // bcrypt.compare("apples", "$2a$10$hmHSDrlywT0oMFTQetedtOmPM8mutPc48Sjc/KcsjjwQ0jwdd6N2W", function(err, res) {
    //     // res == true
    //     console.log("First Guess:", res);
    // });
    // bcrypt.compare("veggies", "$2a$10$hmHSDrlywT0oMFTQetedtOmPM8mutPc48Sjc/KcsjjwQ0jwdd6N2W", function(err, res) {
    //     // res = false
    //     console.log("Second Guess:", res);
    // });