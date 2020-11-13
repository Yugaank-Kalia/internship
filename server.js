const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const verify = require('./verify');
const app = express();

app.use(express.static('public'))

app.use(bodyparser.json());

const User = require("./Models/user");
const Job = require("./Models/jobs");

const mongo_uri = "mongodb+srv://admin:Newboy@33@cluster0.ozybf.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(mongo_uri,  { useNewUrlParser: true }, { useUnifiedTopology: true }, () => {
    console.log("DB Connected")
});
// app.post('/register', (req, res)=>{
//     const user = new User({
//         email : req.body.email,
//         password : req.body.password
//     })

//     user.save()
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => {
//         res.json({ message : "error" });
//     })
// });

app.post('/jobs', (req, res)=>{
    const job = new Job({
        job_title : req.body.job_title,
        location : req.body.location,
        company :  req.body.company,
        salary :  req.body.salary
    })

    job.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message : "error" });
    })
});


app.get('/jobs', verify, async (req, res) =>{
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.json(err);
    }
});

app.post('/login', async (req, res)=>{
    const emailExist = await User.findOne({ email : req.body.email})
    if(!emailExist) return res.status(400).send("Email or password is wrong");
    const validPass =  await User.findOne({ password : req.body.password})
    if(!validPass) return res.status(400).send("Email or password is wrong");

    const token = jwt.sign({ _id : User._id}, "udwqbuiqbdw");
    res.header('auth-token', token).send(token);
})

app.listen(3000);