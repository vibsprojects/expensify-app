import * as firebase from 'firebase';

 // Initialize Firebase
 var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };  

// database.ref('expenses').on('child_removed',(snapshot)=>{
//     console.log(snapshot.key,snapshot.val());
// });

// database.ref('expenses').on('child_changed',(snapshot)=>{
//   console.log('child_changed');
//   console.log(snapshot.key,snapshot.val());
// });

// database.ref('expenses').on('value',(snapshot)=>{
//     const expenses=[];

//     snapshot.forEach((childSnapshot)=>{
//       expenses.push({
//           id:childSnapshot.key,
//           ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
// })

// database.ref('expenses').push({
//     description:'Rent',
//     note:'note1',
//     amount:10.40,
//     createdAt:12345
// });

// database.ref('expenses').push({
//   description:'Phone Bill',
//   note:'',
//   amount:1040,
//   createdAt:12345678
// });

// database.ref('expenses').push({
//   description:'Food',
//   note:'',
//   amount:10,
//   createdAt:1234567877
// });

// database.ref('notes').push({
//   title:'To do 2',
//   body:'Go for run 2'
// });

// database.ref('notes/-LK73IUpBAxcCY8p7rpe').update({
//     body:'Buy Food'
// });


// database.ref('location/city')
//          .once('value')
//          .then((snapshot)=>{
//             const val = snapshot.val();
//             console.log(val);
//          })
//          .catch(()=>{
//             console.log('Error fetching data',e);
//          })

// database.ref().on('value',(snapshot)=>{
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });         


// database.ref().on('value',(snapshot)=>{
//   const val = snapshot.val();
//   console.log(val);
// });         

// setTimeout(() => {
//   database.ref('age').set(19);  
// }, 5000);


// setTimeout(() => {
//     database.ref().off();
// }, 10000);

// setTimeout(() => {
//   database.ref('age').set(30);  
// }, 15500);

// firebase.database().ref().set({
//   name: 'Vibs C',
//   age:34,
//   isSingle:false,
//   stressLevel:6,
//   job: {
//     title:'Developer',  
//     company:'Google'
//   },
//   location:{
//     city:'Sydney',
//     country:'Australia'
//   }, 
// }).then(()=>{
//     console.log('Data is saved');
// }).catch((e)=>{
//     console.log('This failed', e);
// });

// firebase.database().ref('location/city').remove().then(()=>{
//     console.log('city is removed');
// }).catch((e)=>{
//     console.log('Remove failed', e);
// });

// firebase.database().ref().update({
//   stressLevel:9,
//   'job/company': 'Amazon',
//   'location/city':'Brisbane'      
// });

// firebase.database().ref('age').set(35);

// firebase.database().ref('location/city').set('Brisbane');

// firebase.database().ref('attributes').set({
//   height:5,
//   weight:62
// }).then(()=>{
//   console.log('Data is saved');
// }).catch((e)=>{
//   console.log('Error',e);
// });
