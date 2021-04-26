const firebase = require('firebase/app');
const firebase_auth = require('firebase/auth');
const jwt = require('jsonwebtoken')



var firebaseConfig = {
    apiKey: "AIzaSyB_FWRbwP_TtFeYQ8OXwj9WJuA2_wTqcrQ",
    authDomain: "farchis-bbe96.firebaseapp.com",
    databaseURL: "https://farchis-bbe96.firebaseio.com",
    projectId: "farchis-bbe96",
    storageBucket: "farchis-bbe96.appspot.com",
    messagingSenderId: "907377570025",
    appId: "1:907377570025:web:e51de55be0beaaedcec078",
    measurementId: "G-Y4SV39D0FF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
   const auth = firebase.auth();

    const maxAge = 3*24*60*60
   const createWebToken= (email)=>{
       return jwt.sign({email:email},'c3ntricDATA', {
           expiresIn: maxAge
       })

   }


module.exports.login_get=(req,res)=>{
    
    //res.cookie('authenticated','1', { maxAge: 240000, httpOnly: true });
    res.render('login')
}
module.exports.login_post=(req,res)=>{
   
    res.cookie('authenticated', '1',{ maxAge: 240000});
    //login credentials 
    const credentials = req.body
    //authenticanting
    try{
    auth.signInWithEmailAndPassword(credentials.email,credentials.password).then(cred=>{
        if(cred.user.email){
            const token = createWebToken(cred.user.email)
            res.cookie('jwt', token,{httpOnly:true, maxAge:maxAge*1000})
            res.status(200).send({"email":cred.user.email});
        }
        
        
    })
   
    
}
catch(err){
    res.status(400).send(err)
}
    

    
}