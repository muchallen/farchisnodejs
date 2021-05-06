const firebase = require('firebase/app');
const firebase1 = require("firebase");
const { json, text } = require('body-parser');

const { render } = require('ejs');

require('dotenv').config();

// requestuired for side-effects
require("firebase/firestore");



const db = firebase1.firestore();
console.log(db)

module.exports.users_get=(request,response)=>{
       let users =  db.collection('users').get().then(snapshot => {
        const userData = []
        snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
        response.render('users',{userData:userData, userString: JSON.stringify(userData)})

    }).catch((err) =>console.log)  
}
module.exports.users_post=(request,response)=>{
    var id = request.body.id
   try{
    return db.collection("users").doc(id).delete().then(()=> 
      response.status(201).send({message:"User Record successfully deleted!"})
  ).catch((error) =>
      
    response.status(404).send({message:"Error removing user record"})
  );
   }catch(err){
      console.log("paita error")
   }
}

module.exports.vehicle_get=(request,response)=>{
       let users =  db.collection('cars').get().then((snapshot) => {
        const userData = []
        snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
        console.log(userData)
        response.render('vehicles',{databse:userData})
    }).catch(err => console.log)    
}
module.exports.vehicle_post=(request,response)=>{
    console.log(request.body.id)
    return db.collection("cars").doc(request.body.id).delete().then(()=>
        response.status(200).send({message:"Vehicle record is successfully deleted!"})
    ).catch((error)=> 
        response.status(404).send({message:"Error removing vehicle record"})
    );
}

module.exports.towing_get=(request,response)=>{
    let users =  db.collection('tows').orderBy("date","desc").get().then(snapshot => {
     const userData = []
     snapshot.forEach((doc) => {
     userData.push({ ...doc.data(), id: doc.id ,ctime: (doc.data().date.toDate().toString())})});
     const towingString = JSON.stringify(userData)
     return response.render('towing',{databse:userData, Data2:towingString})
 }).catch(err => console.log)    
}



module.exports.towing_post=(request,response)=>{
  console.log(request.body)
    if(request.body.read){
      return db.collection("tows").doc(request.body.id).update({
        recieved:true
      }).catch((err)=>console.log(err))
    }else{
        return db.collection("tows").doc(request.body.id).delete().then(()=> 
        response.status(201).send({message:"Towing record successfully deleted!"})
    ).catch((error) =>
     response.status(404).send({message:"Error removing towing record"})
    );}
    
    
}
module.exports.service_get=(request,response)=>{
    let users =  db.collection('servs').orderBy("date","desc").get().then(snapshot => {
     const userData = []
     snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id , ctime:doc.data().date.toDate().toString()}));
     console.log(userData)
     const quoteString = JSON.stringify(userData)
     return response.render('quotation',{databse:userData,Data2:quoteString})
 }).catch(err => console.log)    
}
module.exports.service_post=(request,response)=>{
  console.log(request.body)
  if(request.body.read){
    return db.collection("servs").doc(request.body.id).update({
      recieved:true
    }).catch((err)=>console.log(err))
  }else{
    return db.collection("servs").doc(request.body.id).delete().then(()=> 
        response.status(200).send({message:"Quotation Record successfully deleted!"})
    ).catch((error) =>
      response.status(404).send({message:"Error removing quotation record"})
    );
}
}
module.exports.events_get=(request,response)=>{
    let users =  db.collection('events').get().then((snapshot) => {
     const userData = []
     snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }))
     const eventsString  = JSON.stringify(userData)
     return response.render('events',{eventsData:userData, Data2:eventsString})
 }).catch(err=>console.log(err))
}
module.exports.events_post=(request,response)=>{
    
  if(request.body.upload==true){
    const newevent = db.collection("events").doc().set({
      event : request.body.eventname,
      date : request.body.eventdate,
      details:request.body.eventdetails,
      venue:request.body.eventvenue,
      image:request.body.image
    }).then(()=>
    response.status(200).send({"message":"event was successfully created "})
    ).catch(error=>
      response.status(401).send({"message":"Event creation failed "+err })
    )
    return
  } else{
     db.collection("events").doc(request.body.id).delete().then(() =>
   response.status(201).send({message:"Event Record successfully deleted!"})
).catch(error=>
  response.status(404).send({message:"Error removing event record"})
)
return
}
}

module.exports.message_get=async (request,response)=>  {
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
module.exports.message_post=(request,response)=>{
//   let users =  db.collection('messages').onSnapshot((snapshot) => {
//    const userData = []
//    snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
//    console.log(userData)
//    response.render('messages',{databse:JSON.stringify(userData)})
// })    
 console.log(request.body);
// Add a new document in collection "cities"

var data = {
  sender: request.body.sender,
  text:request.body.message
}

db.collection("messages").doc("muchallen@gmail.com").collection('chat').doc().set(data)
.then(() => {
  console.log("Document successfully written!");
})
.catch((error) => {
  console.error("Error writing document: ", error);
});
}

module.exports.home_get=(request,response)=>{
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

        

    response.render('home', {tUsers:allUsers.length,
        tTowing:allTowing.length,
        tQuotations:allQuotations.length,
        tVehicles:allVehicles.length,towingGraphData,usersGraphData,quotationGraphData,allVehicles})
}) 
 
}

getData();



}
    

module.exports.accounts_get=(request,response)=>{
    let users =  db.collection('accounts').onSnapshot((snapshot) => {
     const userData = []
     snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
     response.render('accountslist',{userData:userData, userString: JSON.stringify(userData)})
 })    
}


module.exports.sms_post = (req, res) =>{
  // Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+2630783281382',
    from: '+14159933478',
    body: 'Hello from Allen',
  })
  .then(message => console.log(message.sid));


  console.log("zvaita")

  return
}