const express=require('express')
const path=require('path')
const app=express()
const bodyparser=require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true });
const port=8000;
//Define Mongoose Schema
const ContactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Address: String,
    Gender: String,
    desc: String
  });
  const Contact = mongoose.model('contact', ContactSchema);

//EXPRESS SPECIFIC STUFF
//for serving static files   /static is link and static is folder
app.use('/static',express.static('static'))
app.use(express.urlencoded())
//BUG SPECIFIC STUFFS
// set the template engine as PUG 
app.set('view engine', 'pug')

// set the views Directory
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
})
app.get('/About',(req,res)=>{
    const params={}
    res.status(200).render('about.pug',params)
})
app.get('/class',(req,res)=>{
    const params={}
    res.status(200).render('class.pug',params)
})
app.get('/service',(req,res)=>{
    const params={}
    res.status(200).render('service.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item is Saved to the Database")
    }).catch(()=>{
        res.status(400).send("Items was not Saved to Database")
    })
})
app.listen(port,()=>{
    console.log(`The Application start at Port ${port}`)
})