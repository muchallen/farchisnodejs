const firebase = require('firebase/app');
const firebase1 = require("firebase");
const { json, text } = require('body-parser');
const { response } = require('express');
const { render } = require('ejs');

// Required for side-effects
require("firebase/firestore");



const db = firebase1.firestore();
console.log(db)

module.exports.users_get=(req,res)=>{
       let users =  db.collection('users').onSnapshot((snapshot) => {
        const userData = []
        snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
        res.render('users',{userData:userData, userString: JSON.stringify(userData)})
    })    
}
module.exports.users_post=(req,res)=>{
    console.log(req.body.id)
    db.collection("users").doc(req.body.id).delete().then(()=> {
        res.status(201).send({message:"User Record successfully deleted!"})
    }).catch((error) =>{
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing user record"})
    });
}

module.exports.vehicle_get=(req,res)=>{
       let users =  db.collection('cars').onSnapshot((snapshot) => {
        const userData = []
        snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
        console.log(userData)
        res.render('vehicles',{databse:userData})
    })    
}
module.exports.vehicle_post=(req,res)=>{
    console.log(req.body.id)
    db.collection("cars").doc(req.body.id).delete().then(()=>
        res.status(200).send({message:"Vehicle record is successfully deleted!"})
    ).catch((error)=> {
        res.status(404).send({message:"Error removing vehicle record"})
    });
}

module.exports.towing_get=(req,res)=>{
    let users =  db.collection('tows').orderBy("date","desc").onSnapshot((snapshot) => {
     const userData = []
     snapshot.forEach((doc) => {
     userData.push({ ...doc.data(), id: doc.id ,ctime: (doc.data().date.toDate().toString())})});
     const towingString = JSON.stringify(userData)
     res.render('towing',{databse:userData, Data2:towingString})
 })    
}



module.exports.towing_post=(req,res)=>{
    console.log(req.body.id)
    db.collection("tows").doc(req.body.id).delete().then(()=> {
        res.status(201).send({message:"Towing record successfully deleted!"})
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing towing record"})
    });
    
    
}
module.exports.service_get=(req,res)=>{
    let users =  db.collection('servs').orderBy("date","desc").onSnapshot((snapshot) => {
     const userData = []
     snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id , ctime:doc.data().date.toDate().toString()}));
     console.log(userData)
     const quoteString = JSON.stringify(userData)
     res.render('quotation',{databse:userData,Data2:quoteString})
 })    
}
module.exports.service_post=(req,res)=>{
    console.log(req.body.id)
    db.collection("servs").doc(req.body.id).delete().then(()=> {
        res.status(200).send({message:"Quotation Record successfully deleted!"})
    }).catch((error) =>{
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing quotation record"})
    });
}
module.exports.events_get=(req,res)=>{
    let users =  db.collection('events').onSnapshot((snapshot) => {
     const userData = []
     snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
     console.log(userData)
     const eventsString  = JSON.stringify(userData)
     res.render('events',{eventsData:userData, Data2:eventsString})
 })    
}
module.exports.events_post=(req,res)=>{
    console.log(req.body.id)
    db.collection("events").doc(req.body.id).delete().then(() =>{
        res.status(201).send({message:"Even Record successfully deleted!"})
    }).catch((error)=> {
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing event record"})
    });
}

module.exports.message_get=async (req,res)=>  {
  const userData = []
  const chatDetails =[]
 var itemsproccessed=0
    let users = await db.collection('messages').onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc,index,array) => {
      userData.push(doc.id)
        db.collection('messages').doc(doc.id).collection('chat').onSnapshot((snap2)=>{
       snap2.forEach((doc)=>chatDetails.push({...doc.data(),id:doc.id}))
       return chatDetails
      })
     }); 
 })

 if(users!==null){
   console.log(chatDetails)
 } 
}
module.exports.message_post=(req,res)=>{
//   let users =  db.collection('messages').onSnapshot((snapshot) => {
//    const userData = []
//    snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
//    console.log(userData)
//    res.render('messages',{databse:JSON.stringify(userData)})
// })    
 console.log(req.body);
// Add a new document in collection "cities"

var data = {
  sender: req.body.sender,
  text:req.body.message
}

db.collection("messages").doc("muchallen@gmail.com").collection('chat').doc().set(data)
.then(() => {
  console.log("Document successfully written!");
})
.catch((error) => {
  console.error("Error writing document: ", error);
});
}

module.exports.home_get=(req,res)=>{
    let allUsers=[]
    let allTowing=[]
    let allQuotations=[]
    let allVehicles=[]

    let qjan =[],qfeb=[],qmar=[],qapr=[],qmay=[],qjun=[],qjuly=[],qaug=[],qsep=[],qoct=[],qnov=[],qdec=[];
    let tjan =[],tfeb=[],tmar=[],tapr=[],tmay=[],tjun=[],tjuly=[],taug=[],tsep=[],toct=[],tnov=[],tdec=[];
    let ujan =[],ufeb=[],umar=[],uapr=[],umay=[],ujun=[],ujuly=[],uaug=[],usep=[],uoct=[],unov=[],udec=[];

 getData = async ()=>   {
 await db.collection('users').onSnapshot((snapshot) => {
        allUsers = []
     snapshot.forEach((doc) => allUsers.push({ ...doc.data(), id: doc.id }));
//      allUsers.forEach((user)=>{
//         switch(user.date.substring(5,7)) {
//             case "01":
//               ujan.push(towing.date.substring(5,7))
//               break;
//             case "02":
    
//                 ufeb.push(towing.date.substring(5,7))
//               break;
//             case "03":
//                 umar.push(towing.date.substring(5,7))
//               break;
//               case "04":
//                 uapr.push(towing.date.substring(5,7))
//               break;
//               case "05":
//                 umay.push(towing.date.substring(5,7))
//               break;
//               case "06":
//                 ujun.push(towing.date.substring(5,7))
//               break;
//               case "07":
//                 ujuly.push(towing.date.substring(5,7))
//               break;
//               case "08":
//                 uaug.push(towing.date.substring(5,7))
//               break;
//               case "09":
//                 usep.push(towing.date.substring(5,7))
//               break;
//               case "10":
//                 uoct.push(towing.date.substring(5,7))
//               break;
//               case "11":
//                 unov.push(towing.date.substring(5,7))
//               break;
//               case "12":
//                 udec.push(towing.date.substring(5,7))
//               break;
//             default:
//                 break;     
//               // code block
//           }
//  })   
})  
 await db.collection('tows').onSnapshot((snapshot) => {
    allTowing = []
 snapshot.forEach((doc) => allTowing.push({ ...doc.data(), id: doc.id ,ctime: (doc.data().date.toDate().toString())}));
 allTowing.forEach((towing)=>{
    switch(towing.ctime.substring(4,7)) {
        case "Jan":
          tjan.push(towing.ctime.substring(4,7))
          break;
        case "Feb":
            tfeb.push(towing.ctime.substring(4,7))
          break;
        case "Mar":
            tmar.push(towing.ctime.substring(4,7))
          break;
          case "Apr":
            tapr.push(towing.ctime.substring(4,7))
          break;
          case "May":
            tmay.push(towing.ctime.substring(4,7))
          break;
          case "Jun":
            tjun.push(towing.ctime.substring(4,7))
          break;
          case "Jul":
            tjuly.push(towing.ctime.substring(4,7))
          break;
          case "Aug":
            taug.push(towing.ctime.substring(4,7))
          break;
          case "Sep":
            tsep.push(towing.ctime.substring(4,7))
          break;
          case "Oct":
            toct.push(towing.ctime.substring(4,7))
          break;
          case "Nov":
            tnov.push(towing.ctime.substring(4,7))
          break;
          case "Dec":
            tdec.push(towing.ctime.substring(4,7))
          break;
        default:
            break;     
          // code block
      }

})   
})  
await db.collection('servs').onSnapshot((snapshot) => {
    allQuotations = []
 snapshot.forEach((doc) => allQuotations.push({ ...doc.data(), id: doc.id ,ctime: (doc.data().date.toDate().toString())}));
    
 allQuotations.forEach((quotation)=>{
    switch(quotation.ctime.substring(4,7)) {
        case "Jan":
          qjan.push(quotation.ctime.substring(4,7))
          break;
        case "Feb":

            qfeb.push(quotation.ctime.substring(4,7))
          break;
        case "Mar":
            qmar.push(quotation.ctime.substring(4,7))
          break;
          case "Apr":
            qapr.push(quotation.ctime.substring(4,7))
          break;
          case "May":
            qmay.push(quotation.ctime.substring(4,7))
          break;
          case "Jun":
            qjun.push(quotation.ctime.substring(4,7))
          break;
          case "Jul":
            qjuly.push(quotation.ctime.substring(4,7))
          break;
          case "Aug":
            qaug.push(quotation.ctime.substring(4,7))
          break;
          case "Sep":
            qsep.push(quotation.ctime.substring(4,7))
          break;
          case "Oct":
            qoct.push(quotation.ctime.substring(4,7))
          break;
          case "Nov":
            qnov.push(quotation.ctime.substring(4,7))
          break;
          case "Dec":
            qdec.push(quotation.ctime.substring(4,7))
          break;
        default:
            break;     
          // code block
      }

 })
}) 

await db.collection('cars').onSnapshot((snapshot) => {
    allVehicles = []
 snapshot.forEach((doc) => allVehicles.push({ ...doc.data(), id: doc.id }));
    towingGraphData = [
        tjan,tfeb,tmar,tapr,tmay,tjun,tjuly,taug,tsep,toct,tnov,tdec
    ]
    quotationGraphData=[
        qjan,qfeb,qmar,qapr,qmay,qjun,qjuly,qaug,qsep,qoct,qnov,qdec
    ]
    usersGraphData=[
        ujan,ufeb,umar,uapr,umay,ujun,ujuly,uaug,usep,uoct,unov,udec
    ]

        

    res.render('home', {tUsers:allUsers.length,
        tTowing:allTowing.length,
        tQuotations:allQuotations.length,
        tVehicles:allVehicles.length,towingGraphData,usersGraphData,quotationGraphData,allVehicles})
}) 
 
}

getData();



}
    

module.exports.accounts_get=(req,res)=>{
    let users =  db.collection('accounts').onSnapshot((snapshot) => {
     const userData = []
     snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
     res.render('accountslist',{userData:userData, userString: JSON.stringify(userData)})
 })    
}
