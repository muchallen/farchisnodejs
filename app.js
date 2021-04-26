const express = require('express');
const router = require('./routes/auth')
const mainApp = require('./routes/mainApp')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var PORT = process.env.PORT || 3100;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())



app.set('view engine', 'ejs');


app.listen(PORT, ()=>{
    console.log('listening at port'+ PORT)
})

app.use(router)
app.use(mainApp)


app.get('/users', (req, res)=>res.render('users')); 

 


