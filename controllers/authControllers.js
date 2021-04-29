const firebase = require('firebase/app');
const firebase_auth = require('firebase/auth');
const jwt = require('jsonwebtoken')
const firebase1 = require("firebase");



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
   const bucket = firebase.storageBucket().bucket();
   const db = firebase1.firestore()

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
   
    
    //login credentials 
    const credentials = req.body
    //authenticanting
    
    auth.signInWithEmailAndPassword(credentials.email,credentials.password).then(cred=>{
        if(cred.user.email){
            const token = createWebToken(cred.user.email)
            res.cookie('jwtFarchis', token,{httpOnly:true, maxAge:maxAge*1000})
            res.status(200).send({"email":cred.user.email});
        }
    }).catch(err=>res.status(400).send({"message" :"login failed verify your username and password"}))

    

    
}

module.exports.logout_get=(req,res)=>{
    auth.signOut().then(() => {
        res.cookie('jwtFarchis',"logut",{httpOnly:true, maxAge:1*1000} )
        res.redirect("/login")
      }).catch((error) => {
        res.status(401).send({"message": "logout failed" +error})
      }); 
}




module.exports.signup_get=(req,res)=>{
    
    //res.cookie('authenticated','1', { maxAge: 240000, httpOnly: true });
    res.render('signup')
}
module.exports.signup_post=(req,res)=>{
    const credentials = req.body 
    auth.createUserWithEmailAndPassword(credentials.email,credentials.password).then(cred=>{
        if(cred.user.email){
            db.collection('accounts').doc(cred.user.email).set({
                email : cred.user.email
            })
            console.log(cred.user)
            res.status(200).send({"message":"User Created","user":cred.user }) 
        }
    }).catch(err=>res.status(400).send({"message" :"signup failed" + err}))
  
}

