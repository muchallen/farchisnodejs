const express = require('express');
const router = require('./routes/auth')
const mainApp = require('./routes/mainApp')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const functions = require('./functions/firebase-functions');
var PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())



app.set('view engine', 'ejs');


app.listen(PORT, ()=>{
    console.log('listening at port 3100')
})

app.use(router)
app.use(mainApp)


//exports.app = functions.https.onRequest(app);

app.get('/users', (req, res)=>res.render('users')); 

 


