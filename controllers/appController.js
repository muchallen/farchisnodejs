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
    db.collection("users").doc(req.body.id).delete().then(function() {
        res.status(201).send({message:"Document successfully deleted!"})
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing record"})
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
    db.collection("cars").doc(req.body.id).delete().then(function() {
        res.status(201).send({message:"Document successfully deleted!"})
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing record"})
    });
}

module.exports.towing_get=(req,res)=>{
    let users =  db.collection('tows').orderBy("date","desc").onSnapshot((snapshot) => {
     const userData = []
     snapshot.forEach((doc) => {
     console.log(doc.data().date.toDate().toString())
     userData.push({ ...doc.data(), id: doc.id ,ctime:doc.data().date.toDate().toString()})});
     console.log(userData)
     const towingString = JSON.stringify(userData)
     res.render('towing',{databse:userData, Data2:towingString})
 })    
}



module.exports.towing_post=(req,res)=>{
    console.log(req.body.id)
    db.collection("tows").doc(req.body.id).delete().then(function() {
        res.status(201).send({message:"Document successfully deleted!"})
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing record"})
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
    db.collection("servs").doc(req.body.id).delete().then(function() {
        res.status(201).send({message:"Document successfully deleted!"})
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing record"})
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
    db.collection("events").doc(req.body.id).delete().then(function() {
        res.status(201).send({message:"Document successfully deleted!"})
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        res.status(404).send({message:"Error removing record"})
    });
}

module.exports.message_get=  async (req,res)=>  {
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
//  await db.collection('tows').onSnapshot((snapshot) => {
//     allTowing = []
//  snapshot.forEach((doc) => allTowing.push({ ...doc.data(), id: doc.id }));
//  allTowing.forEach((towing)=>{
//     switch(towing.date.substring(5,7)) {
//         case "01":
//           tjan.push(towing.date.substring(5,7))
//           break;
//         case "02":

//             tfeb.push(towing.date.substring(5,7))
//           break;
//         case "03":
//             tmar.push(towing.date.substring(5,7))
//           break;
//           case "04":
//             tapr.push(towing.date.substring(5,7))
//           break;
//           case "05":
//             tmay.push(towing.date.substring(5,7))
//           break;
//           case "06":
//             tjun.push(towing.date.substring(5,7))
//           break;
//           case "07":
//             tjuly.push(towing.date.substring(5,7))
//           break;
//           case "08":
//             taug.push(towing.date.substring(5,7))
//           break;
//           case "09":
//             tsep.push(towing.date.substring(5,7))
//           break;
//           case "10":
//             toct.push(towing.date.substring(5,7))
//           break;
//           case "11":
//             tnov.push(towing.date.substring(5,7))
//           break;
//           case "12":
//             tdec.push(towing.date.substring(5,7))
//           break;
//         default:
//             break;     
//           // code block
//       }

// })   
// })  
await db.collection('servs').onSnapshot((snapshot) => {
    allQuotations = []
 snapshot.forEach((doc) => allQuotations.push({ ...doc.data(), id: doc.id }));
    
 allQuotations.forEach((quotation)=>{
    // switch(quotation.date.substring(5,7)) {
    //     case "01":
    //       qjan.push(quotation.date.substring(5,7))
    //       break;
    //     case "02":

    //         qfeb.push(quotation.date.substring(5,7))
    //       break;
    //     case "03":
    //         qmar.push(quotation.date.substring(5,7))
    //       break;
    //       case "04":
    //         qapr.push(quotation.date.substring(5,7))
    //       break;
    //       case "05":
    //         qmay.push(quotation.date.substring(5,7))
    //       break;
    //       case "06":
    //         qjun.push(quotation.date.substring(5,7))
    //       break;
    //       case "07":
    //         qjuly.push(quotation.date.substring(5,7))
    //       break;
    //       case "08":
    //         qaug.push(quotation.date.substring(5,7))
    //       break;
    //       case "09":
    //         qsep.push(quotation.date.substring(5,7))
    //       break;
    //       case "10":
    //         qoct.push(quotation.date.substring(5,7))
    //       break;
    //       case "11":
    //         qnov.push(quotation.date.substring(5,7))
    //       break;
    //       case "12":
    //         qdec.push(quotation.date.substring(5,7))
    //       break;
    //     default:
    //         break;     
    //       // code block
    //   }

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
    